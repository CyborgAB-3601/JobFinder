import nlp from 'compromise';

interface KeywordCount {
  keyword: string;
  count: number;
}

// Common technical keywords that should be extracted
const technicalKeywords = [
  // Programming Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala',
  'html', 'css', 'sql', 'r', 'matlab', 'perl', 'bash', 'powershell',
  
  // Frameworks & Libraries
  'react', 'react native', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel',
  'bootstrap', 'tailwind', 'sass', 'less', 'redux', 'mobx', 'jquery', 'lodash',
  
  // Databases
  'mysql', 'postgresql', 'mongodb', 'redis', 'sqlite', 'oracle', 'sql server', 'database', 'databases',
  
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'ci/cd',
  'terraform', 'ansible', 'chef', 'puppet', 'linux', 'ubuntu', 'centos',
  
  // Design Tools
  'figma', 'sketch', 'adobe xd', 'adobexd', 'photoshop', 'illustrator', 'invision', 'zeplin',
  'adobe creative suite', 'adobe cc', 'creative suite',
  
  // Mobile Development
  'android', 'ios', 'flutter', 'xamarin', 'cordova', 'ionic', 'firebase',
  
  // Machine Learning & Data
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
  'matplotlib', 'seaborn', 'jupyter', 'nlp', 'computer vision', 'ai', 'artificial intelligence',
  
  // Testing & QA
  'selenium', 'cypress', 'jest', 'mocha', 'junit', 'pytest', 'manual testing', 'automated testing',
  'unit testing', 'integration testing', 'e2e testing',
  
  // Methodologies
  'agile', 'scrum', 'kanban', 'waterfall', 'devops', 'lean', 'six sigma',
  
  // Soft Skills
  'leadership', 'teamwork', 'communication', 'problem solving', 'analytical', 'creative',
  'collaborative', 'detail-oriented', 'organized', 'time management', 'project management',
  
  // Tools & Platforms
  'wordpress', 'shopify', 'salesforce', 'hubspot', 'slack', 'trello', 'jira', 'confluence',
  'microsoft office', 'excel', 'powerpoint', 'power bi', 'tableau', 'looker'
];

export function extractKeywordsAI(text: string): KeywordCount[] {
  const doc = nlp(text);
  const nouns = doc.nouns().out('array') as string[];
  const verbs = doc.verbs().out('array') as string[];
  
  // Count occurrences of each keyword
  const keywordCounts: { [key: string]: number } = {};
  
  // Extract technical keywords from the text
  const lowerText = text.toLowerCase();
  
  // Check for technical keywords
  technicalKeywords.forEach(keyword => {
    // Escape special regex characters
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword.replace(/[-\s]/g, '[\\s-]*')}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + matches.length;
    }
  });
  
  // Also extract nouns and verbs that might be relevant
  const allWords = [...nouns, ...verbs];
  allWords.forEach(word => {
    const cleanWord = word.replace(/[^\w\s]/g, '').trim().toLowerCase();
    if (cleanWord.length > 2 && !technicalKeywords.includes(cleanWord)) {
      // Only add if it's not already captured as a technical keyword
      keywordCounts[cleanWord] = (keywordCounts[cleanWord] || 0) + 1;
    }
  });
  
  // Convert to array of objects with keyword and count
  const keywords: KeywordCount[] = Object.entries(keywordCounts)
    .filter(([_, count]) => count > 0) // Only include keywords that appear at least once
    .map(([keyword, count]) => ({
      keyword,
      count
    }))
    .sort((a, b) => b.count - a.count); // Sort by frequency
  
  return keywords;
} 