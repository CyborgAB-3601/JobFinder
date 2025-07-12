import React from 'react';
import Navbar from './Navbar';

const AboutUsPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#200848', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, margin: '2rem 0 1rem 0', lineHeight: 1.1 }}>
            <span style={{ color: '#4e5cf7' }}>About</span> the Developer
          </h1>
          <p style={{ fontSize: 20, color: '#b3baff', marginBottom: 32 }}>
            Meet the creator behind this AI-powered job finder
          </p>
        </div>

        {/* Developer Profile */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: '#4e5cf7', 
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              SP
            </div>
            <h2 style={{ color: '#ffd700', fontSize: 32, marginBottom: '0.5rem' }}>
              Supriya P
            </h2>
            <p style={{ color: '#b3baff', fontSize: 18, marginBottom: '1rem' }}>
              Full Stack Developer & AI Enthusiast
            </p>
            <p style={{ color: '#4ade80', fontSize: 16, fontWeight: 600 }}>
              SRM Institute of Science and Technology, Chennai
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>🎓 Education</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Currently pursuing studies at SRM Institute of Science and Technology in Chennai, 
                focusing on computer science and software development. Passionate about creating 
                innovative solutions that make a difference.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>💻 Technical Skills</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Proficient in React, TypeScript, Node.js, and modern web technologies. 
                Experienced with AI/ML integration, PDF processing, and natural language processing. 
                Passionate about creating user-friendly applications with cutting-edge technology.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>🔗 Connect</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a 
                  href="https://github.com/supr-pall" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#4ade80',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: 14
                  }}
                >
                  <span style={{ fontSize: '18px' }}>📁</span>
                  GitHub: supr-pall
                </a>
                <p style={{ color: '#b3baff', fontSize: 12, marginTop: '0.5rem' }}>
                  Check out my projects and contributions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🚀 About This Project
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>🎯 Mission</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                To revolutionize job searching by combining AI technology with user-friendly design. 
                This project aims to help job seekers find their perfect match through intelligent 
                resume analysis and smart job matching algorithms.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>💡 Innovation</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Built with cutting-edge technologies including React 19, TypeScript, PDF.js, 
                and advanced NLP libraries. Features intelligent keyword extraction, fuzzy matching, 
                and comprehensive character trait analysis.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>🎨 Design</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Focused on creating an intuitive, beautiful user experience with modern UI/UX principles. 
                Responsive design ensures the application works seamlessly across all devices and platforms.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            ⚡ Technical Highlights
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📄</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>PDF Processing</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Advanced PDF text extraction with support for complex layouts and formatting
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🧠</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>AI Analysis</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Natural language processing for intelligent information extraction and analysis
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Smart Matching</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Fuzzy matching algorithms for accurate job-candidate pairing and scoring
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📊</div>
              <h3 style={{ color: '#4e5cf7', fontSize: 16, marginBottom: '0.5rem' }}>Visual Results</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Beautiful, interactive results with progress bars and detailed analysis
              </p>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🔮 Future Vision
          </h2>
          
          <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
            <p style={{ color: '#b3baff', fontSize: 16, lineHeight: 1.6, marginBottom: '1rem' }}>
              This project represents the beginning of a larger vision to transform how people find and 
              connect with job opportunities. Future plans include:
            </p>
            
            <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6, paddingLeft: '1.5rem' }}>
              <li><strong>Enhanced AI:</strong> More sophisticated machine learning models for better matching</li>
              <li><strong>Mobile App:</strong> Native mobile applications for iOS and Android</li>
              <li><strong>Employer Portal:</strong> Tools for companies to post jobs and manage applications</li>
              <li><strong>Analytics Dashboard:</strong> Insights into job market trends and salary data</li>
              <li><strong>Integration:</strong> Connect with LinkedIn, Indeed, and other job platforms</li>
            </ul>
          </div>
        </div>

        {/* Contact & Links */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            📞 Get in Touch
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>💼 Portfolio</h3>
              <a 
                href="https://github.com/supr-pall" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: '#4ade80',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                View My GitHub Profile →
              </a>
              <p style={{ color: '#b3baff', fontSize: 14, marginTop: '0.5rem' }}>
                Explore my projects, contributions, and technical expertise
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>🎓 Education</h3>
              <p style={{ color: '#b3baff', fontSize: 16, fontWeight: 600 }}>
                SRM Institute of Science and Technology
              </p>
              <p style={{ color: '#b3baff', fontSize: 14 }}>
                Chennai, India
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

export default AboutUsPage; 