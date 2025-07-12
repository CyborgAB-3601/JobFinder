import { matchJobs } from './src/utils/jobMatcher.js';

// Test the eligibility calculation
const testCases = [
  {
    name: "Software Engineer with all skills",
    keywords: ["javascript", "python", "react", "node.js", "sql", "git", "aws", "docker", "api", "database"],
    expectedPercentage: 100
  },
  {
    name: "Software Engineer with 8/10 skills",
    keywords: ["javascript", "python", "react", "node.js", "sql", "git", "aws", "docker"],
    expectedPercentage: 80
  },
  {
    name: "Software Engineer with 6/10 skills",
    keywords: ["javascript", "python", "react", "node.js", "sql", "git"],
    expectedPercentage: 60
  },
  {
    name: "Software Engineer with 4/10 skills",
    keywords: ["javascript", "python", "react", "node.js"],
    expectedPercentage: 40
  },
  {
    name: "Software Engineer with 2/10 skills",
    keywords: ["javascript", "python"],
    expectedPercentage: 20
  },
  {
    name: "Frontend Developer with relevant skills",
    keywords: ["javascript", "html", "css", "react", "vue", "angular", "typescript"],
    expectedPercentage: 70
  },
  {
    name: "Data Scientist with relevant skills",
    keywords: ["python", "sql", "pandas", "numpy", "scikit-learn", "machine learning"],
    expectedPercentage: 60
  }
];

console.log('Testing eligibility percentage calculation...\n');

testCases.forEach((testCase, index) => {
  const matchedJobs = matchJobs(testCase.keywords);
  const softwareEngineerJob = matchedJobs.find(job => job.title === "Software Engineer");
  
  if (softwareEngineerJob) {
    const actualPercentage = softwareEngineerJob.eligibilityPercentage;
    const isCorrect = actualPercentage === testCase.expectedPercentage;
    
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`Keywords: [${testCase.keywords.join(', ')}]`);
    console.log(`Expected: ${testCase.expectedPercentage}%`);
    console.log(`Actual: ${actualPercentage}%`);
    console.log(`Status: ${isCorrect ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Matched skills: [${softwareEngineerJob.matchedKeywords.join(', ')}]`);
    console.log('---');
  } else {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`Keywords: [${testCase.keywords.join(', ')}]`);
    console.log(`Status: ❌ FAIL - No Software Engineer job found`);
    console.log('---');
  }
});

// Test all jobs
console.log('\nTesting all job types...\n');
const allSkills = ["javascript", "python", "react", "node.js", "sql", "git", "aws", "docker", "api", "database", "html", "css", "vue", "angular", "typescript", "sass", "webpack", "responsive", "java", "mongodb", "redis", "kubernetes", "microservices", "r", "pandas", "numpy", "scikit-learn", "tensorflow", "matplotlib", "statistics", "machine learning", "jenkins", "linux", "bash", "terraform", "ci/cd", "monitoring", "figma", "adobe xd", "sketch", "prototyping", "user research", "wireframing", "design systems", "accessibility", "responsive design", "user testing", "agile", "scrum", "product strategy", "user stories", "roadmapping", "analytics", "stakeholder management", "market research", "prioritization", "mvp", "selenium", "junit", "testng", "cypress", "manual testing", "automation", "bug tracking", "test planning", "api testing", "performance testing"];

const allJobs = matchJobs(allSkills);
allJobs.forEach(job => {
  console.log(`${job.title}: ${job.eligibilityPercentage}% (${job.matchedKeywords.length}/${job.keywords.length} skills)`);
}); 