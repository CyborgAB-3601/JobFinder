// Test smart name extraction with various formats
const testCases = [
  // ALL CAPS names
  "JANE DOE Software Engineer & Problem Solver",
  "JOHN ANDERSON - Senior Developer",
  "MARIA GARCIA | Product Manager",
  "DAVID CHEN & Data Scientist",
  
  // Title Case names
  "Jane Doe - UI/UX Designer janedoe.design | janedoe@gmail.com",
  "John Smith | Software Engineer | john@email.com",
  "Maria Garcia & Product Manager",
  "David Chen – Data Scientist",
  "Sarah Johnson | sarah.johnson@company.com",
  "Michael Brown - Senior Developer",
  
  // Names with middle initials
  "John A. Smith - Software Engineer",
  "Maria L. Garcia | Product Manager",
  "David R. Chen & Data Scientist",
  
  // Names with titles
  "Jane Doe Software Engineer",
  "John Smith Product Manager",
  "Maria Garcia Data Scientist",
  
  // Complex first lines
  "JANE DOE Software Engineer & Problem Solver john.doe@email.com | (555) 123-4567",
  "Jane Doe - UI/UX Designer janedoe.design | janedoe@gmail.com | Behance: @janedoe | +1 123 456 7890",
  
  // Edge cases
  "1. JOHN ANDERSON Software Engineer & Problem Solver",
  "Contact: Alice Wilson | alice@email.com",
  "Name: Robert Davis | robert.davis@company.com"
];

function extractNameSmart(lines) {
  // Helper regex for names (supports accents, initials, middle names)
  const nameRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})$/;
  const allCapsRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}){1,3})$/;
  const nameAfterLabelRegex = /^(Contact|Name|Candidate|Applicant)[:\-\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})/;

  function isSectionHeader(line) {
    const clean = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!clean) return false;
    if (/^[A-Z\s]+$/.test(line) && line.length < 40) return true;
    if (line.trim().endsWith(':')) return true;
    const sectionHeaderKeywords = /(education|academic|degree|qualification|experience|work history|employment|professional experience|career|skills|projects|certification|summary|profile|objective|references|other highlights)/i;
    if (sectionHeaderKeywords.test(clean)) return true;
    return false;
  }

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
  }

  return 'Not found';
}

console.log('Testing SMART name extraction...\n');

testCases.forEach((testCase, index) => {
  const result = extractNameSmart([testCase]);
  console.log(`Test ${index + 1}: "${testCase}"`);
  console.log(`Result: "${result}"`);
  console.log('---');
}); 