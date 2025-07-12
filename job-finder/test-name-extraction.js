import fs from 'fs';

// Import the name extraction function (simplified version for testing)
function extractNameSmart(lines) {
  // Common patterns for name extraction
  const namePatterns = [
    // Pattern 1: ALL CAPS name at the very beginning (most common resume format)
    /^([A-Z][A-Z\s]+)$/m,
    // Pattern 2: Title case name (First Last)
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})$/m,
    // Pattern 3: Name followed by title or contact info
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:Software|Engineer|Developer|Manager|Analyst|Designer|Consultant|Specialist|Lead|Intern|Officer|Director|Architect|QA|Tester|Administrator|Executive|Writer|Marketer|Support|Business|Product|DevOps|Cybersecurity|Scientist)/i,
    // Pattern 4: Name in contact line with email/phone
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\(\d{3}\)\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4})/i,
    // Pattern 5: Name followed by location
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:[A-Z][a-z]+,\s*[A-Z]{2}|[A-Z][a-z]+,\s*[A-Z][a-z]+)/i,
    // Pattern 6: Name with LinkedIn/GitHub
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:linkedin\.com|github\.com)/i
  ];

  function isSectionHeader(line) {
    const clean = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!clean) return false;
    if (/^[A-Z\s]+$/.test(line) && line.length < 40) return true;
    if (line.trim().endsWith(':')) return true;
    const sectionHeaderKeywords = /(education|academic|degree|qualification|experience|work history|employment|professional experience|career|skills|projects|certification|summary|profile|objective|references|other highlights)/i;
    if (sectionHeaderKeywords.test(clean)) return true;
    return false;
  }

  function isValidName(name) {
    // Remove extra whitespace
    name = name.trim();
    
    // Must be 2-50 characters
    if (name.length < 2 || name.length > 50) return false;
    
    // Must contain at least one space (first and last name)
    if (!name.includes(' ')) return false;
    
    // Must be 2-4 words
    const words = name.split(/\s+/);
    if (words.length < 2 || words.length > 4) return false;
    
    // Check if it's ALL CAPS (common resume format)
    if (/^[A-Z\s]+$/.test(name)) {
      // For ALL CAPS names, just check that each word is at least 2 characters
      for (const word of words) {
        if (word.length < 2) return false;
      }
    } else {
      // For title case names, each word must start with uppercase letter
      for (const word of words) {
        if (!/^[A-Z][a-z]+$/.test(word)) return false;
      }
    }
    
    // Must not contain common non-name words
    const nonNameWords = [
      'email', 'phone', 'contact', 'address', 'linkedin', 'github', 'resume', 'cv',
      'curriculum', 'vitae', 'summary', 'profile', 'objective', 'education', 'experience',
      'skills', 'projects', 'certifications', 'awards', 'references', 'available', 'upon',
      'request', 'software', 'engineer', 'developer', 'manager', 'analyst', 'designer',
      'consultant', 'specialist', 'lead', 'intern', 'officer', 'director', 'architect',
      'tester', 'administrator', 'executive', 'writer', 'marketer', 'support', 'business',
      'product', 'devops', 'cybersecurity', 'scientist', 'bachelor', 'master', 'phd',
      'university', 'college', 'institute', 'school', 'academy', 'graduated', 'degree'
    ];
    
    const lowerName = name.toLowerCase();
    for (const word of nonNameWords) {
      if (lowerName.includes(word)) return false;
    }
    
    return true;
  }

  // Check first 15 lines for name patterns
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const line = lines[i].trim();
    if (!line || line.length < 2) continue;

    // Skip lines that are clearly not names
    if (/\b(email|phone|contact|address|linkedin|github|curriculum|vitae|cv|resume|summary|profile|objective|education|experience|skills|projects|certifications|awards|references)\b/i.test(line)) {
      continue;
    }

    // Skip section headers
    if (isSectionHeader(line)) continue;

    // Pattern 1: ALL CAPS name (most common resume format)
    if (/^[A-Z][A-Z\s]+$/.test(line)) {
      const name = line.trim();
      if (isValidName(name)) {
        return name;
      }
    }

    // Pattern 2: Title case name (First Last)
    if (/^[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}$/.test(line)) {
      if (isValidName(line)) {
        return line;
      }
    }

    // Pattern 3: Name followed by title or contact info
    const nameWithTitle = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:Software|Engineer|Developer|Manager|Analyst|Designer|Consultant|Specialist|Lead|Intern|Officer|Director|Architect|QA|Tester|Administrator|Executive|Writer|Marketer|Support|Business|Product|DevOps|Cybersecurity|Scientist)/i);
    if (nameWithTitle && nameWithTitle[1]) {
      const name = nameWithTitle[1].trim();
      if (isValidName(name)) {
        return name;
      }
    }

    // Pattern 4: Name in contact line with email/phone
    const nameWithContact = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\(\d{3}\)\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4})/i);
    if (nameWithContact && nameWithContact[1]) {
      const name = nameWithContact[1].trim();
      if (isValidName(name)) {
        return name;
      }
    }

    // Pattern 5: Name followed by location
    const nameWithLocation = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:[A-Z][a-z]+,\s*[A-Z]{2}|[A-Z][a-z]+,\s*[A-Z][a-z]+)/i);
    if (nameWithLocation && nameWithLocation[1]) {
      const name = nameWithLocation[1].trim();
      if (isValidName(name)) {
        return name;
      }
    }

    // Pattern 6: Name with LinkedIn/GitHub
    const nameWithSocial = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[|&]?\s*(?:linkedin\.com|github\.com)/i);
    if (nameWithSocial && nameWithSocial[1]) {
      const name = nameWithSocial[1].trim();
      if (isValidName(name)) {
        return name;
      }
    }
  }

  return 'Not found';
}

// Test with demo resume
const demoResume = fs.readFileSync('demo-resume.txt', 'utf8');
const lines = demoResume.split('\n').map(line => line.trim()).filter(Boolean);

console.log('Testing name extraction with demo resume...');
console.log('First 10 lines of resume:');
lines.slice(0, 10).forEach((line, index) => {
  console.log(`${index + 1}: "${line}"`);
});

const extractedName = extractNameSmart(lines);
console.log(`\nExtracted name: "${extractedName}"`);

// Test with different name formats
const testCases = [
  'JOHN ANDERSON',
  'John Anderson',
  'John Anderson | Software Engineer',
  'John Anderson | john@email.com',
  'John Anderson | San Francisco, CA',
  'John Anderson | linkedin.com/in/johnanderson',
  'John Anderson Software Engineer',
  'John Anderson & Problem Solver',
  'John Anderson, Software Engineer',
  'John Anderson - Software Engineer',
  'John Anderson | (555) 123-4567',
  'John Anderson | github.com/johnanderson'
];

console.log('\nTesting various name formats:');
testCases.forEach(testCase => {
  const result = extractNameSmart([testCase]);
  console.log(`"${testCase}" -> "${result}"`);
}); 