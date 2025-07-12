import React from 'react';
import Navbar from './Navbar';

const TipsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#200848', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, margin: '2rem 0 1rem 0', lineHeight: 1.1 }}>
            <span style={{ color: '#4e5cf7' }}>Resume Tips</span> & ATS<br />Optimization Guide
          </h1>
          <p style={{ fontSize: 20, color: '#b3baff', marginBottom: 32 }}>
            Master the art of creating ATS-friendly resumes that get you noticed
          </p>
        </div>

        {/* ATS Section */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🤖 Understanding ATS (Applicant Tracking Systems)
          </h2>
          <p style={{ fontSize: 16, color: '#b3baff', lineHeight: 1.6, marginBottom: '1rem' }}>
            ATS systems scan resumes for relevant keywords before human eyes ever see them. 
            Up to 75% of resumes are rejected by ATS before reaching hiring managers.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>✅ What ATS Loves</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Simple, clean formatting</li>
                <li>Standard section headers</li>
                <li>Relevant keywords from job posting</li>
                <li>Reverse chronological order</li>
                <li>Plain text (.txt) or Word (.docx) files</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#ef4444', fontSize: 18, marginBottom: '0.5rem' }}>❌ What ATS Hates</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Complex graphics and tables</li>
                <li>Unusual fonts and colors</li>
                <li>Headers and footers</li>
                <li>Images and charts</li>
                <li>PDF files (some systems)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resume Structure */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            📋 Perfect Resume Structure
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>1. Contact Information</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Name, phone, email, LinkedIn. No photo or personal details.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>2. Professional Summary</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                2-3 sentences highlighting key achievements and career goals.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>3. Work Experience</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Company, title, dates. Use action verbs and quantify achievements.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>4. Education</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Degree, institution, graduation date. Include relevant certifications.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>5. Skills Section</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Technical skills, software, languages. Match job requirements.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>6. Keywords</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Include industry-specific terms and job posting keywords.
              </p>
            </div>
          </div>
        </div>

        {/* Keyword Optimization */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🔍 Keyword Optimization Strategy
          </h2>
          
          <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', marginBottom: '1rem' }}>
            <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>How to Find Keywords</h3>
            <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
              <li><strong>Job Description Analysis:</strong> Copy-paste the job posting into a word cloud generator</li>
              <li><strong>Industry Research:</strong> Check similar job postings for common terms</li>
              <li><strong>Company Research:</strong> Visit company website and LinkedIn for their terminology</li>
              <li><strong>Skill Variations:</strong> Include both technical and soft skill variations</li>
            </ul>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h4 style={{ color: '#ffd700', fontSize: 16, marginBottom: '0.5rem' }}>Technical Keywords</h4>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Programming languages, software, tools, methodologies, certifications
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h4 style={{ color: '#ffd700', fontSize: 16, marginBottom: '0.5rem' }}>Soft Skills Keywords</h4>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Leadership, communication, problem-solving, teamwork, analytical
              </p>
            </div>
          </div>
        </div>

        {/* Latest Trends */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🚀 2024 Resume Trends & Insights
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>AI Integration</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Mention AI/ML experience if relevant</li>
                <li>Include automation and efficiency keywords</li>
                <li>Highlight data-driven decision making</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>Remote Work Skills</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Virtual collaboration tools</li>
                <li>Remote project management</li>
                <li>Digital communication skills</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>Sustainability Focus</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Green technology experience</li>
                <li>ESG (Environmental, Social, Governance)</li>
                <li>Sustainable business practices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            ✅ Your Action Plan
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📝</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Step 1: Analyze</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Study job descriptions and identify key requirements
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🔧</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Step 2: Optimize</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Tailor your resume with relevant keywords and achievements
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🧪</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Step 3: Test</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Use ATS simulators to check your resume's compatibility
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📤</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Step 4: Apply</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Submit with confidence knowing your resume is ATS-optimized
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/" style={{
            background: '#4e5cf7',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 16,
            display: 'inline-block'
          }}>
            ← Back to Job Finder
          </a>
        </div>
      </main>
    </div>
  );
};

export default TipsPage; 