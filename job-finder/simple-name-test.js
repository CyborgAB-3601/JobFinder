import fs from 'fs';

// Simplified name extraction test
function testNameExtraction() {
  const demoResume = fs.readFileSync('demo-resume.txt', 'utf8');
  const lines = demoResume.split('\n').map(line => line.trim()).filter(Boolean);
  
  console.log('Testing name extraction...');
  console.log('First line:', lines[0]);
  
  // Test ALL CAPS pattern
  if (/^[A-Z][A-Z\s]+$/.test(lines[0])) {
    console.log('✅ ALL CAPS pattern matched:', lines[0]);
  } else {
    console.log('❌ ALL CAPS pattern failed for:', lines[0]);
  }
  
  // Test if it's a valid name
  const words = lines[0].split(/\s+/);
  console.log('Words:', words);
  console.log('Word count:', words.length);
  
  if (words.length >= 2 && words.length <= 4) {
    console.log('✅ Word count is valid');
  } else {
    console.log('❌ Word count is invalid');
  }
  
  // Check if each word is at least 2 characters
  let allWordsValid = true;
  for (const word of words) {
    if (word.length < 2) {
      allWordsValid = false;
      console.log('❌ Word too short:', word);
    }
  }
  
  if (allWordsValid) {
    console.log('✅ All words are valid length');
  }
  
  // Check for non-name words
  const nonNameWords = ['email', 'phone', 'contact', 'address', 'linkedin', 'github'];
  const lowerName = lines[0].toLowerCase();
  let containsNonNameWord = false;
  
  for (const word of nonNameWords) {
    if (lowerName.includes(word)) {
      containsNonNameWord = true;
      console.log('❌ Contains non-name word:', word);
    }
  }
  
  if (!containsNonNameWord) {
    console.log('✅ No non-name words found');
  }
  
  // Final result
  if (/^[A-Z][A-Z\s]+$/.test(lines[0]) && 
      words.length >= 2 && words.length <= 4 && 
      allWordsValid && !containsNonNameWord) {
    console.log('✅ VALID NAME FOUND:', lines[0]);
  } else {
    console.log('❌ INVALID NAME:', lines[0]);
  }
}

testNameExtraction(); 