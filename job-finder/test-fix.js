// Test the fixed name extraction
const testCases = [
  "Jane Doe - UI/UX Designer janedoe.design | janedoe@gmail.com | Behance: @janedoe | +1 123 456 7890",
  "John Smith | Software Engineer | john@email.com",
  "Maria Garcia & Product Manager",
  "David Chen – Data Scientist",
  "Sarah Johnson | sarah.johnson@company.com",
  "Michael Brown - Senior Developer"
];

function extractNameSmart(lines) {
  // Helper regex for names (supports accents, initials, middle names)
  const nameRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+|\s+[A-Z]\.|\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ][a-záéíóúñäëïöü]+){1,3})$/;
  const allCapsRegex = /^([A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}(?:\s+[A-ZÁÉÍÓÚÑÄËÏÖÜ]{2,}){1,3})$/;

  function isSectionHeader(line) {
    const clean = line.replace(/[^a-zA-Z]/g, '').toLowerCase();
    if (!clean) return false;
    if (/^[A-Z\s]+$/.test(line) && line.length < 40) return true;
    if (line.trim().endsWith(':')) return true;
    const sectionHeaderKeywords = /(education|academic|degree|qualification|experience|work history|employment|professional experience|career|skills|projects|certification|summary|profile|objective|references|other highlights)/i;
    if (sectionHeaderKeywords.test(clean)) return true;
    return false;
  }

  // Check the first 10 lines for a likely name
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

    // 3. Name followed by dash and title (Jane Doe - UI/UX Designer)
    const nameWithTitle = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[-–—]\s*/);
    if (nameWithTitle && nameWithTitle[1]) {
      const name = nameWithTitle[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 4. Name followed by pipe and contact info (Jane Doe | janedoe@gmail.com)
    const nameWithPipe = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[|]/);
    if (nameWithPipe && nameWithPipe[1]) {
      const name = nameWithPipe[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }

    // 5. Name followed by any separator and additional text
    const nameWithSeparator = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[-–—|&]\s*/);
    if (nameWithSeparator && nameWithSeparator[1]) {
      const name = nameWithSeparator[1].trim();
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        return name;
      }
    }
  }

  return 'Not found';
}

console.log('Testing fixed name extraction...\n');

testCases.forEach((testCase, index) => {
  const result = extractNameSmart([testCase]);
  console.log(`Test ${index + 1}: "${testCase}"`);
  console.log(`Result: "${result}"`);
  console.log('---');
}); 