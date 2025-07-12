import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

const degreeKeywords = /(btech|mtech|phd|mba|b\.sc|m\.sc|bachelor|master|diploma)/i;
const institutionKeywords = /(university|college|institute|school|academy)/i;
const educationKeywords = /(university|college|school|institute|academy|bachelor|master|phd|b\.sc|m\.sc|btech|mtech|mba|diploma|high school|secondary|graduated|degree)/i;
const companyKeywords = /(company|inc|llc|solutions|technologies|corporation|corp|systems|enterprises|group|limited|ltd)/i;
const jobKeywords = /(engineer|developer|manager|analyst|designer|consultant|specialist|lead|intern|officer|director|architect|qa|tester|administrator|executive|writer|marketer|support|business analyst|product manager|devops|cybersecurity|scientist)/i;
const sectionHeaderKeywords = /(education|academic|degree|qualification|experience|work history|employment|professional experience|career|skills|projects|certification|summary|profile|objective|references|other highlights)/i;
const nextSectionRegex = /(certifications|projects|skills|summary|profile|objective|references|other highlights|work|experience|employment|professional experience|career)/i;

// Character traits that indicate good employee qualities
const characterTraits = [
  // Work ethic
  'hardworking', 'diligent', 'dedicated', 'committed', 'reliable', 'responsible', 'punctual', 'consistent',
  'hard-working', 'hard working', 'self-motivated', 'self motivated', 'proactive', 'initiative', 'driven',
  
  // Problem solving
  'problem-solving', 'problem solving', 'analytical', 'critical thinking', 'strategic', 'logical', 'systematic',
  'troubleshooting', 'trouble-shooting', 'debugging', 'optimization', 'optimizing', 'efficiency', 'efficient',
  
  // Creativity and innovation
  'creative', 'innovative', 'innovator', 'inventive', 'original', 'imaginative', 'visionary', 'forward-thinking',
  'forward thinking', 'cutting-edge', 'cutting edge', 'pioneering', 'breakthrough', 'revolutionary',
  
  // Leadership and teamwork
  'leader', 'leadership', 'team player', 'teamwork', 'collaborative', 'cooperative', 'mentor', 'mentoring',
  'coaching', 'guiding', 'inspiring', 'motivating', 'empowering', 'delegating', 'managing', 'supervising',
  
  // Communication
  'communicative', 'articulate', 'presentation', 'public speaking', 'interpersonal', 'relationship building',
  'stakeholder', 'client-facing', 'client facing', 'customer service', 'customer-facing', 'customer facing',
  
  // Adaptability
  'adaptable', 'flexible', 'versatile', 'multitasking', 'multi-tasking', 'dynamic', 'agile', 'scalable',
  'scaling', 'growth', 'learning', 'quick learner', 'fast learner', 'self-taught', 'self taught',
  
  // Results-oriented
  'results-driven', 'results driven', 'goal-oriented', 'goal oriented', 'achievement', 'performance',
  'deliverable', 'milestone', 'deadline', 'timeline', 'project management', 'project manager',
  
  // Technical and professional
  'expert', 'specialist', 'professional', 'certified', 'accredited', 'qualified', 'skilled', 'proficient',
  'advanced', 'senior', 'principal', 'architect', 'consultant', 'advisor', 'strategist',
  
  // Positive attitude
  'positive', 'enthusiastic', 'passionate', 'energetic', 'optimistic', 'confident', 'ambitious', 'determined',
  'persistent', 'resilient', 'tenacious', 'focused', 'detail-oriented', 'detail oriented', 'meticulous',
  
  // Learning and growth
  'continuous learning', 'continuous improvement', 'best practices', 'industry knowledge', 'trends',
  'research', 'analysis', 'data-driven', 'data driven', 'evidence-based', 'evidence based'
];

function findCharacterTraits(text: string): { traits: string[], highlightedText: string } {
  const lowerText = text.toLowerCase();
  const foundTraits: string[] = [];
  
  // Find all character traits in the text
  characterTraits.forEach(trait => {
    const regex = new RegExp(`\\b${trait.replace(/[-\s]/g, '[\\s-]*')}\\b`, 'gi');
    if (regex.test(lowerText)) {
      foundTraits.push(trait);
    }
  });
  
  // Remove duplicates and sort
  const uniqueTraits = [...new Set(foundTraits)].sort();
  
  // Highlight traits in the original text
  let highlightedText = text;
  uniqueTraits.forEach(trait => {
    const regex = new RegExp(`\\b${trait.replace(/[-\s]/g, '[\\s-]*')}\\b`, 'gi');
    highlightedText = highlightedText.replace(regex, `<span style="color: #4ade80; font-weight: bold; background-color: rgba(74, 222, 128, 0.1); padding: 2px 4px; border-radius: 4px;">$&</span>`);
  });
  
  return {
    traits: uniqueTraits,
    highlightedText: highlightedText
  };
}

function isSectionHeader(line: string): boolean {
  const clean = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (!clean) return false;
  if (/^[A-Z\s]+$/.test(line) && line.length < 40) return true;
  if (line.trim().endsWith(':')) return true;
  if (sectionHeaderKeywords.test(clean)) return true;
  return false;
}

function extractNameSmart(lines: string[]): string {
  // Helper regex for names (supports accents, initials, middle names)
  const nameRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})$/;
  const allCapsRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}){1,3})$/;
  const nameAfterLabelRegex = /^(Contact|Name|Candidate|Applicant)[:\-\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})/;

  // SMART NAME EXTRACTION: Focus on the first line and extract name from the beginning
  if (lines.length > 0) {
    let firstLine = lines[0].replace(/^\d+\.\s*/, '').trim();
    
    // Pattern 1: ALL CAPS name at the very beginning (JANE DOE followed by anything)
    const allCapsMatch = firstLine.match(/^([A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}){1,3})/);
    if (allCapsMatch && allCapsMatch[1]) {
      const name = allCapsMatch[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => w.length >= 2)) {
        return name;
      }
    }

    // Pattern 2: Title Case name at the very beginning (Jane Doe followed by anything)
    const titleCaseMatch = firstLine.match(/^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})/);
    if (titleCaseMatch && titleCaseMatch[1]) {
      const name = titleCaseMatch[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // Pattern 3: Name followed by any separator (Jane Doe - UI/UX Designer)
    const nameWithSeparator = firstLine.match(/^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})\s*[-–—|&]/);
    if (nameWithSeparator && nameWithSeparator[1]) {
      const name = nameWithSeparator[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // Pattern 4: Name followed by space and title (Jane Doe Software Engineer)
    const nameWithTitle = firstLine.match(/^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})\s+[A-Z]/);
    if (nameWithTitle && nameWithTitle[1]) {
      const name = nameWithTitle[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }
  }

  // Fallback: Check the first 10 lines for a likely name
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    let line = lines[i].replace(/^\d+\.\s*/, '').trim();
    if (!line || line.length < 2) continue;

    // Ignore lines that are ONLY emails, phones, URLs, or section headers
    if (/^(email|phone|contact|address|linkedin|github|curriculum|vitae|cv|resume|summary|profile|objective|education|experience|skills|projects|certifications|awards|references|www\.|http)/i.test(line)) continue;
    if (isSectionHeader(line)) continue;

    // 1. ALL CAPS name
    const capsMatch = line.match(allCapsRegex);
    if (capsMatch && capsMatch[1]) {
      const name = capsMatch[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => w.length >= 2)) {
        return name;
      }
    }

    // 2. Title Case name (with/without middle initials)
    const nameMatch = line.match(nameRegex);
    if (nameMatch && nameMatch[1]) {
      const name = nameMatch[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 3. Name after label (Contact: John A. Anderson)
    const labelMatch = line.match(nameAfterLabelRegex);
    if (labelMatch && labelMatch[2]) {
      const name = labelMatch[2].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 4. Name followed by dash and title (Jane Doe - UI/UX Designer)
    const nameWithTitle = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[-–—]\s*/);
    if (nameWithTitle && nameWithTitle[1]) {
      const name = nameWithTitle[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 5. Name followed by pipe and contact info (Jane Doe | janedoe@gmail.com)
    const nameWithPipe = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[|]/);
    if (nameWithPipe && nameWithPipe[1]) {
      const name = nameWithPipe[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 6. Name followed by any separator and additional text
    const nameWithSeparator = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[-–—|&]\s*/);
    if (nameWithSeparator && nameWithSeparator[1]) {
      const name = nameWithSeparator[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }
  }

  // Fallback: Try to extract ALL CAPS name from the first 100 chars of the resume
  if (lines.length > 0) {
    const firstChunk = lines.slice(0, 3).join(' ').slice(0, 100);
    const capsMatch = firstChunk.match(/([A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}){1,3})/);
    if (capsMatch && capsMatch[1]) {
      const name = capsMatch[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4 && words.every(w => w.length >= 2)) {
        return name;
      }
    }
  }

  // Fallback: Use NLP to find person entities
  try {
    const doc = nlp.readDoc(lines.slice(0, 10).join(' '));
    const people = doc.entities().filter((e: any) => e.out(its.type) === 'PERSON').out();
    if (people.length > 0) {
      const name = people[0];
      if (isValidName(name)) {
        return name;
      }
    }
  } catch (error) {
    console.warn('NLP name extraction failed:', error);
  }

  return 'Not found';
}

function isValidName(name: string): boolean {
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

function extractEducationBlockSmart(lines: string[], fullText: string): string {
  // If the text is a single line, or if 'Education' is embedded, extract after 'Education' and stop at next section header
  const eduIdx = fullText.toLowerCase().indexOf('education');
  if (eduIdx !== -1) {
    let afterEdu = fullText.slice(eduIdx + 'education'.length);
    // Stop at next section header or known keyword
    const stopMatch = afterEdu.match(nextSectionRegex);
    if (stopMatch) {
      afterEdu = afterEdu.slice(0, stopMatch.index);
    }
    // Clean up: remove leading/trailing separators and whitespace
    afterEdu = afterEdu.replace(/^[:\-\s]+/, '').replace(/[|]+$/, '').trim();
    return afterEdu.length > 0 ? afterEdu : 'Not found';
  }
  // Fallback: previous block logic
  const eduBlock = extractEducationBlock(lines);
  if (eduBlock && eduBlock !== 'Not found') return eduBlock;
  return 'Not found';
}

function extractExperienceBlockSmart(lines: string[], fullText: string): string {
  // Look for 'Experience' as a standalone section header, not embedded in other text
  const expPattern = /\bExperience\b/i;
  const expMatch = fullText.match(expPattern);
  
  if (expMatch) {
    const expIdx = expMatch.index!;
    let afterExp = fullText.slice(expIdx + expMatch[0].length);
    
    // Stop at next section header or known keyword
    const stopMatch = afterExp.match(nextSectionRegex);
    if (stopMatch) {
      afterExp = afterExp.slice(0, stopMatch.index);
    }
    
    // Clean up: remove leading/trailing separators and whitespace
    afterExp = afterExp.replace(/^[:\-\s]+/, '').replace(/[|]+$/, '').trim();
    return afterExp.length > 0 ? afterExp : 'Not found';
  }
  
  // Fallback: previous block logic
  const expBlock = extractExperienceBlock(lines);
  if (expBlock && expBlock !== 'Not found') return expBlock;
  return 'Not found';
}

function extractEducationBlock(lines: string[]): string {
  const eduIdx = lines.findIndex(line => /education/i.test(line));
  if (eduIdx !== -1) {
    let block: string[] = [];
    for (let i = eduIdx + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      if (isSectionHeader(line)) break;
      block.push(line);
    }
    return block.length > 0 ? block.join(' | ') : 'Not found';
  }
  return 'Not found';
}

function extractExperienceBlock(lines: string[]): string {
  const expIdx = lines.findIndex(line => /experience/i.test(line));
  if (expIdx !== -1) {
    let block: string[] = [];
    for (let i = expIdx + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      if (isSectionHeader(line)) break;
      block.push(line);
    }
    return block.length > 0 ? block.join(' | ') : 'Not found';
  }
  return 'Not found';
}

function extractSection(lines: string[], sectionNames: string[], fallbackNames: string[] = []): string {
  const sectionIdx = lines.findIndex(line => sectionNames.some(name => {
    const cleanLine = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return cleanLine.includes(cleanName);
  }));
  if (sectionIdx !== -1) {
    let sectionLines: string[] = [];
    let blankCount = 0;
    for (let i = sectionIdx + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) {
        blankCount++;
        if (blankCount > 2) break;
        continue;
      }
      if (isSectionHeader(line) && !sectionNames.some(name => {
        const cleanLine = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const cleanName = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
        return cleanLine.includes(cleanName);
      })) break;
      sectionLines.push(line);
      blankCount = 0;
    }
    return sectionLines.length > 0 ? sectionLines.join(' | ') : 'Not found';
  }
  for (const fallback of fallbackNames) {
    const idx = lines.findIndex(line => line.toLowerCase().includes(fallback.toLowerCase()));
    if (idx !== -1) {
      let sectionLines: string[] = [];
      let blankCount = 0;
      for (let i = idx + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
          blankCount++;
          if (blankCount > 2) break;
          continue;
        }
        if (isSectionHeader(line) && !fallback.toLowerCase().includes(line.toLowerCase())) break;
        sectionLines.push(line);
        blankCount = 0;
      }
      return sectionLines.length > 0 ? sectionLines.join(' | ') : 'Not found';
    }
  }
  return 'Not found';
}

export function extractResumeSummary(text: string): { name: string, education: string, experience: string, characterTraits: string[], highlightedEducation: string, highlightedExperience: string } {
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
  let education = extractEducationBlockSmart(lines, text);
  if (!education || education === 'Not found') {
    education = extractSection(lines, ['Education', 'Academic', 'Degree', 'Qualification']);
  }
  let experience = extractExperienceBlockSmart(lines, text);
  if (!experience || experience === 'Not found') {
    experience = extractSection(lines, ['Experience', 'Work History', 'Employment', 'Professional Experience', 'Career'], ['Projects', 'Professional Summary']);
  }
  
  // Find character traits in the entire text
  const { traits: characterTraits, highlightedText } = findCharacterTraits(text);
  
  // Find character traits specifically in education and experience sections
  const { highlightedText: highlightedEducation } = findCharacterTraits(education);
  const { highlightedText: highlightedExperience } = findCharacterTraits(experience);
  
  return {
    name: extractNameSmart(lines),
    education: education || 'Not found',
    experience: experience || 'Not found',
    characterTraits,
    highlightedEducation,
    highlightedExperience
  };
}

// For debugging: export a function to get the parsed lines
export function getResumeLines(text: string): string[] {
  return text.split(/\n/).map(l => l.trim()).filter(Boolean);
} 