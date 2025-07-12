import fs from 'fs';

// Test with the raw text provided by user
const rawText = `1. JOHN ANDERSON Software Engineer & Problem Solver john.anderson@email.com | (555) 123-4567 | linkedin.com/in/johnanderson San Francisco, CA | github.com/johnanderson PROFESSIONAL SUMMARY Results-driven and innovative software engineer with 5+ years of experience in full-stack development. Hardworking and dedicated professional who consistently delivers high-quality solutions through creative problem-solving approaches. Excellent team player with strong leadership skills and proven ability to mentor junior developers. Adaptable and quick learner who thrives in dynamic environments. EDUCATION Bachelor of Science in Computer Science Stanford University, Stanford, CA Graduated with honors - GPA: 3.8/4.0 Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems CERTIFICATIONS • AWS Certified Solutions Architect • Google Cloud Professional Developer • Certified Scrum Master (CSM) TECHNICAL SKILLS Programming Languages: JavaScript, TypeScript, Python, Java, C++ Frontend: React, Angular, Vue.js, HTML5, CSS3, SASS Backend: Node.js, Express, Django, Spring Boot Database: PostgreSQL, MongoDB, Redis, MySQL Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Jenkins Tools: Git, JIRA, Confluence, Postman, VS Code PROFESSIONAL EXPERIENCE Senior Software Engineer | TechCorp Solutions | 2022 - Present • Led development of scalable microservices architecture serving 1M+ users • Mentored 3 junior developers and conducted code reviews to maintain code quality • Implemented creative solutions for complex business problems, improving system performance by 40% • Collaborated with cross-functional teams to deliver innovative features ahead of schedule • Proactive in identifying and resolving potential issues before they impact production • Responsible for designing and implementing data-driven solutions for business analytics Software Developer | InnovateTech Inc. | 2020 - 2022 • Developed and maintained critical applications using cutting-edge technologies • Worked as a reliable team player in an agile environment with 8-person development team • Demonstrated strong problem-solving skills by debugging complex system issues • Contributed to continuous improvement initiatives that enhanced development processes • Self-motivated individual who consistently exceeded project expectations • Flexible and adaptable when working with changing requirements and priorities Junior Developer | StartupXYZ | 2019 - 2020 • Built responsive web applications using modern JavaScript frameworks • Quick learner who mastered new technologies within weeks • Assisted in database optimization and performance tuning • Participated in code reviews and knowledge sharing sessions • Enthusiastic about learning new technologies and best practices PROJECTS E-Commerce Platform | Personal Project | 2023 • Designed and developed a full-stack e-commerce solution using React and Node.js • Implemented secure payment processing and user authentication • Used innovative approaches to optimize database queries and improve load times • Deployed using Docker containers on AWS with automated CI/CD pipeline Task Management App | Team Project | 2022 • Led a team of 4 developers in creating a collaborative task management application • Applied strategic thinking to design scalable architecture • Implemented real-time features using WebSocket technology • Achieved 95% test coverage through systematic testing approach LEADERSHIP & VOLUNTEERING Technical Lead | Open Source Project | 2022 - Present • Leading development of an open-source library with 500+ contributors • Mentoring new contributors and maintaining code quality standards • Organized community events and knowledge sharing sessions • Passionate about giving back to the developer community Volunteer Coding Instructor | Local Community Center | 2021 - Present • Teaching programming fundamentals to underprivileged youth • Inspiring the next generation of developers through hands-on projects • Patient and encouraging mentor who adapts teaching style to individual needs AWARDS & RECOGNITION • Employee of the Year 2023 - TechCorp Solutions • Best Innovation Award 2022 - TechCorp Solutions • Dean's List - Stanford University (2017-2019) • Hackathon Winner - Silicon Valley Tech Conference 2021 LANGUAGES • English (Native) • Spanish (Conversational) INTERESTS • Continuous learning and professional development • Open source contribution and community building • Reading about emerging technologies and industry trends • Participating in hackathons and coding competitions • Hiking and outdoor activities for work-life balance REFERENCES Available upon request this was my raw lines still name not found`;

function extractNameFromRawText(text) {
  console.log('Testing name extraction from raw text...');
  console.log('Text length:', text.length);
  console.log('First 100 characters:', text.substring(0, 100));
  console.log('Looking for name patterns...');
  
  // Try to find the name at the beginning
  const namePatterns = [
    // Pattern 1: ALL CAPS name at the beginning
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+[A-Z][a-z])/,
    // Pattern 2: ALL CAPS name followed by title
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+Software|Engineer|Developer|Manager|Analyst|Designer|Consultant|Specialist|Lead|Intern|Officer|Director|Architect|QA|Tester|Administrator|Executive|Writer|Marketer|Support|Business|Product|DevOps|Cybersecurity|Scientist)/i,
    // Pattern 3: ALL CAPS name followed by email
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
    // Pattern 4: ALL CAPS name followed by phone
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+\(\d{3}\)\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4})/,
    // Pattern 5: ALL CAPS name followed by LinkedIn
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+linkedin\.com)/i,
    // Pattern 6: ALL CAPS name followed by GitHub
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+github\.com)/i,
    // Pattern 7: ALL CAPS name followed by location
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+[A-Z][a-z]+,\s*[A-Z]{2}|[A-Z][a-z]+,\s*[A-Z][a-z]+)/,
    // Pattern 8: Simple ALL CAPS name
    /^(\d+\.\s*)?([A-Z][A-Z\s]+?)(?=\s+[A-Z][a-z])/,
  ];
  
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[2]) {
      const name = match[2].trim();
      console.log('Found name with pattern:', pattern.source);
      console.log('Extracted name:', name);
      
      // Validate the name
      const words = name.split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        let allWordsValid = true;
        for (const word of words) {
          if (word.length < 2) {
            allWordsValid = false;
            break;
          }
        }
        
        if (allWordsValid) {
          console.log('✅ VALID NAME FOUND:', name);
          return name;
        }
      }
    }
  }
  
  console.log('❌ No valid name found');
  return 'Not found';
}

const extractedName = extractNameFromRawText(rawText);
console.log('\nFinal result:', extractedName); 