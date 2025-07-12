import React from 'react';

interface ResumeSummaryCardProps {
  name: string;
  education: string;
  experience: string;
  characterTraits: string[];
  highlightedEducation: string;
  highlightedExperience: string;
}

const ResumeSummaryCard: React.FC<ResumeSummaryCardProps> = ({ 
  name, 
  education, 
  experience, 
  characterTraits, 
  highlightedEducation, 
  highlightedExperience 
}) => {
  return (
    <div style={{ background: '#23104a', borderRadius: 14, padding: '2rem', margin: '2rem auto', maxWidth: 420, boxShadow: '0 2px 12px #0002' }}>
      <h2 style={{ color: '#4e5cf7', marginBottom: 18 }}>Summary</h2>
      <div style={{ fontSize: 17, marginBottom: 10 }}><strong>Name:</strong> {name}</div>
      
      <div style={{ fontSize: 17, marginBottom: 10 }}>
        <strong>Education:</strong>
        <div 
          style={{ 
            marginTop: 5, 
            padding: '8px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '6px',
            lineHeight: '1.4'
          }}
          dangerouslySetInnerHTML={{ __html: highlightedEducation }}
        />
      </div>
      
      <div style={{ fontSize: 17, marginBottom: 15 }}>
        <strong>Experience:</strong>
        <div 
          style={{ 
            marginTop: 5, 
            padding: '8px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '6px',
            lineHeight: '1.4'
          }}
          dangerouslySetInnerHTML={{ __html: highlightedExperience }}
        />
      </div>
      
      {characterTraits.length > 0 && (
        <div style={{ fontSize: 17, marginTop: 15 }}>
          <strong style={{ color: '#4ade80' }}>🌟 Character Traits (Good Hire Indicators):</strong>
          <div style={{ 
            marginTop: 8, 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '6px',
            padding: '8px',
            background: 'rgba(74, 222, 128, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(74, 222, 128, 0.3)'
          }}>
            {characterTraits.map((trait, index) => (
              <span 
                key={index}
                style={{
                  color: '#4ade80',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  padding: '4px 8px',
                  background: 'rgba(74, 222, 128, 0.2)',
                  borderRadius: '12px',
                  border: '1px solid rgba(74, 222, 128, 0.4)'
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSummaryCard; 