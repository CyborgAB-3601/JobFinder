// Simple test for Jane Doe extraction
const testLine = "Jane Doe - UI/UX Designer janedoe.design | janedoe@gmail.com | Behance: @janedoe | +1 123 456 7890";

// Test the pattern that should match Jane Doe
const nameWithTitle = testLine.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[-–—]\s*/);

console.log('Test line:', testLine);
console.log('Pattern match:', nameWithTitle);
if (nameWithTitle && nameWithTitle[1]) {
  console.log('✅ Extracted name:', nameWithTitle[1].trim());
} else {
  console.log('❌ No match found');
}

// Test with pipe separator
const testLine2 = "Jane Doe | janedoe@gmail.com";
const nameWithPipe = testLine2.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+|\s+[A-Z]\.|\s+[A-Z][a-z]+){1,3})\s*[|]/);

console.log('\nTest line 2:', testLine2);
console.log('Pipe pattern match:', nameWithPipe);
if (nameWithPipe && nameWithPipe[1]) {
  console.log('✅ Extracted name:', nameWithPipe[1].trim());
} else {
  console.log('❌ No match found');
} 