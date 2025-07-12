// Enhanced job matching with better percentage calculation
export const jobs = [
  {
    title: "Software Engineer",
    keywords: ["javascript", "python", "react", "node.js", "sql", "git", "aws", "docker", "api", "database"]
  },
  {
    title: "Frontend Developer", 
    keywords: ["javascript", "html", "css", "react", "vue", "angular", "typescript", "sass", "webpack", "responsive"]
  },
  {
    title: "Backend Developer",
    keywords: ["python", "java", "node.js", "sql", "mongodb", "redis", "docker", "kubernetes", "microservices", "api"]
  },
  {
    title: "Data Scientist",
    keywords: ["python", "r", "sql", "pandas", "numpy", "scikit-learn", "tensorflow", "matplotlib", "statistics", "machine learning"]
  },
  {
    title: "DevOps Engineer",
    keywords: ["docker", "kubernetes", "aws", "jenkins", "git", "linux", "bash", "terraform", "ci/cd", "monitoring"]
  },
  {
    title: "UI/UX Designer",
    keywords: ["figma", "adobe xd", "sketch", "prototyping", "user research", "wireframing", "design systems", "accessibility", "responsive design", "user testing"]
  },
  {
    title: "Product Manager",
    keywords: ["agile", "scrum", "product strategy", "user stories", "roadmapping", "analytics", "stakeholder management", "market research", "prioritization", "mvp"]
  },
  {
    title: "QA Engineer",
    keywords: ["selenium", "junit", "testng", "cypress", "manual testing", "automation", "bug tracking", "test planning", "api testing", "performance testing"]
  }
];

export function matchJobs(candidateKeywords: string[]): any[] {
  return jobs.map(job => {
    const matchedKeywords = job.keywords.filter(jobKeyword => 
      candidateKeywords.some(candidateKeyword => 
        candidateKeyword.toLowerCase().includes(jobKeyword.toLowerCase()) ||
        jobKeyword.toLowerCase().includes(candidateKeyword.toLowerCase())
      )
    );
    
    // Calculate eligibility percentage: (matched job keywords / total job keywords) * 100
    const eligibilityPercentage = Math.round((matchedKeywords.length / job.keywords.length) * 100);
    
    return {
      ...job,
      matchedKeywords,
      eligibilityPercentage
    };
  }).filter(job => job.matchedKeywords.length > 0); // Only return jobs with at least one match
} 