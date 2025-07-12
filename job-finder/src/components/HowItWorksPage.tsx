import React from 'react';
import Navbar from './Navbar';

const HowItWorksPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#200848', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, margin: '2rem 0 1rem 0', lineHeight: 1.1 }}>
            <span style={{ color: '#4e5cf7' }}>How Our</span> AI-Powered<br />Job Finder Works
          </h1>
          <p style={{ fontSize: 20, color: '#b3baff', marginBottom: 32 }}>
            Discover the technology behind intelligent resume analysis and job matching
          </p>
        </div>

        {/* Overview */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🚀 Technology Overview
          </h2>
          <p style={{ fontSize: 16, color: '#b3baff', lineHeight: 1.6, marginBottom: '1rem' }}>
            Our job finder uses advanced AI algorithms to analyze your resume, extract key information, 
            and match you with the most suitable job opportunities. The system combines natural language 
            processing, fuzzy matching, and intelligent scoring to provide accurate results.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>📄</div>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>PDF Processing</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Advanced PDF text extraction with support for complex layouts
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🧠</div>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>AI Analysis</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Natural language processing for intelligent information extraction
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: '0.5rem' }}>🎯</div>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>Smart Matching</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                Fuzzy matching algorithms for accurate job-candidate pairing
              </p>
            </div>
          </div>
        </div>

        {/* Flow Chart */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem', textAlign: 'center' }}>
            📊 Process Flow Chart
          </h2>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              1
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>Upload Resume</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>User uploads PDF resume</p>
            </div>
            
            {/* Arrow */}
            <div style={{ fontSize: '24px', color: '#4e5cf7' }}>↓</div>
            
            {/* Step 2 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              2
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>Text Extraction</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>PDF.js extracts all text content</p>
            </div>
            
            {/* Arrow */}
            <div style={{ fontSize: '24px', color: '#4e5cf7' }}>↓</div>
            
            {/* Step 3 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              3
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>AI Analysis</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>NLP extracts name, education, experience</p>
            </div>
            
            {/* Arrow */}
            <div style={{ fontSize: '24px', color: '#4e5cf7' }}>↓</div>
            
            {/* Step 4 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              4
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>Keyword Extraction</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>Technical skills and keywords identified</p>
            </div>
            
            {/* Arrow */}
            <div style={{ fontSize: '24px', color: '#4e5cf7' }}>↓</div>
            
            {/* Step 5 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              5
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>Job Matching</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>Fuzzy matching with job database</p>
            </div>
            
            {/* Arrow */}
            <div style={{ fontSize: '24px', color: '#4e5cf7' }}>↓</div>
            
            {/* Step 6 */}
            <div style={{ 
              background: '#4e5cf7', 
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              6
            </div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: 18, marginBottom: '0.5rem' }}>Results Display</h3>
              <p style={{ color: '#b3baff', fontSize: 14 }}>Matched jobs with eligibility scores</p>
            </div>
          </div>
        </div>

        {/* Step by Step Process */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🔍 Step-by-Step Process
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 1: Resume Upload</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Users upload their resume in PDF format. Our system accepts various PDF layouts 
                and extracts text content using advanced PDF processing technology.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 2: Text Processing</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                PDF.js library extracts all text content from the resume, handling complex 
                layouts, tables, and formatting while preserving the original structure.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 3: Information Extraction</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Natural Language Processing (NLP) algorithms identify and extract key information 
                including name, education, work experience, and character traits.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 4: Keyword Analysis</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Advanced keyword extraction identifies technical skills, programming languages, 
                tools, and soft skills using comprehensive technical keyword databases.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 5: Job Matching</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                Fuzzy matching algorithms compare extracted keywords with job requirements, 
                calculating eligibility percentages based on skill overlap and relevance.
              </p>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4e5cf7', fontSize: 18, marginBottom: '0.5rem' }}>Step 6: Results Generation</h3>
              <p style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.6 }}>
                System generates comprehensive results including matched jobs, eligibility scores, 
                character traits analysis, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            🛠️ Technology Stack
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 16, marginBottom: '0.5rem' }}>Frontend</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>React 19 with TypeScript</li>
                <li>Vite for fast development</li>
                <li>React Router for navigation</li>
                <li>Custom CSS styling</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 16, marginBottom: '0.5rem' }}>PDF Processing</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>PDF.js for text extraction</li>
                <li>FileReader API</li>
                <li>Uint8Array processing</li>
                <li>Multi-page support</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 16, marginBottom: '0.5rem' }}>NLP & AI</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Compromise.js for text analysis</li>
                <li>Wink NLP for advanced processing</li>
                <li>Fuzzy matching algorithms</li>
                <li>Levenshtein distance</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 16, marginBottom: '0.5rem' }}>Data Processing</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Regex pattern matching</li>
                <li>Keyword frequency analysis</li>
                <li>Similarity scoring</li>
                <li>Eligibility calculations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div style={{ background: '#2a1053', borderRadius: 12, padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ffd700', fontSize: 28, marginBottom: '1rem' }}>
            ⭐ Key Features & Capabilities
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>🔍 Intelligent Analysis</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Extracts name, education, experience</li>
                <li>Identifies character traits</li>
                <li>Highlights positive qualities</li>
                <li>Handles various resume formats</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>🎯 Smart Matching</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Fuzzy keyword matching</li>
                <li>Eligibility percentage calculation</li>
                <li>Sorted by best matches</li>
                <li>Gap analysis for missing skills</li>
              </ul>
            </div>
            
            <div style={{ background: '#1a0933', borderRadius: 8, padding: '1.5rem' }}>
              <h3 style={{ color: '#4ade80', fontSize: 18, marginBottom: '0.5rem' }}>📊 Comprehensive Results</h3>
              <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5 }}>
                <li>Visual progress bars</li>
                <li>Character trait analysis</li>
                <li>Final assessment scoring</li>
                <li>Personalized recommendations</li>
              </ul>
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

export default HowItWorksPage; 