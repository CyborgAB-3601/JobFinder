import React from 'react';

interface FinalAssessmentProps {
  characterTraits: string[];
  highestJobMatch: {
    title: string;
    percentage: number;
  } | null;
  totalJobsMatched: number;
}

const FinalAssessment: React.FC<FinalAssessmentProps> = ({ 
  characterTraits, 
  highestJobMatch, 
  totalJobsMatched 
}) => {
  if (!highestJobMatch) {
    return null;
  }

  // Calculate character traits score (0-100)
  const characterScore = Math.min(characterTraits.length * 10, 100);
  
  // Get job match percentage
  const jobMatchScore = highestJobMatch.percentage;
  
  // Calculate overall score (weighted: 40% character traits, 60% job match)
  const overallScore = Math.round((characterScore * 0.4) + (jobMatchScore * 0.6));
  
  // Determine assessment level
  const getAssessmentLevel = (score: number) => {
    if (score >= 85) return { level: 'Excellent', color: '#4ade80', description: 'Highly qualified candidate with strong technical skills and excellent character traits.' };
    if (score >= 70) return { level: 'Good', color: '#fbbf24', description: 'Well-qualified candidate with good technical skills and positive character traits.' };
    if (score >= 55) return { level: 'Moderate', color: '#f97316', description: 'Moderately qualified candidate with some relevant skills and character traits.' };
    return { level: 'Needs Improvement', color: '#ef4444', description: 'Candidate needs to develop more relevant skills and character traits.' };
  };

  const assessment = getAssessmentLevel(overallScore);

  return (
    <div style={{ 
      marginTop: '2.5rem', 
      background: '#23104a', 
      borderRadius: 12, 
      padding: '2rem',
      border: `2px solid ${assessment.color}`,
      boxShadow: `0 0 20px ${assessment.color}20`
    }}>
      <h2 style={{ color: '#4e5cf7', marginBottom: 20, textAlign: 'center', fontSize: 24 }}>
        Final Assessment
      </h2>
      
      {/* Overall Score */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ 
          fontSize: 48, 
          fontWeight: 700, 
          color: assessment.color,
          marginBottom: 8
        }}>
          {overallScore}%
        </div>
        <div style={{ 
          fontSize: 20, 
          color: assessment.color, 
          fontWeight: 600,
          marginBottom: 8
        }}>
          {assessment.level}
        </div>
        <div style={{ 
          fontSize: 14, 
          color: '#b3baff',
          lineHeight: 1.4
        }}>
          {assessment.description}
        </div>
      </div>

      {/* Score Breakdown */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem',
        marginBottom: 24
      }}>
        {/* Character Traits Score */}
        <div style={{ 
          background: '#1a0933', 
          borderRadius: 8, 
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 14, color: '#b3baff', marginBottom: 8 }}>
            Character Traits Score
          </div>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 700, 
            color: '#4ade80',
            marginBottom: 4
          }}>
            {characterScore}%
          </div>
          <div style={{ fontSize: 12, color: '#b3baff' }}>
            {characterTraits.length} positive traits identified
          </div>
        </div>

        {/* Job Match Score */}
        <div style={{ 
          background: '#1a0933', 
          borderRadius: 8, 
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 14, color: '#b3baff', marginBottom: 8 }}>
            Best Job Match
          </div>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 700, 
            color: '#ffd700',
            marginBottom: 4
          }}>
            {jobMatchScore}%
          </div>
          <div style={{ fontSize: 12, color: '#b3baff' }}>
            {highestJobMatch.title}
          </div>
        </div>
      </div>

      {/* Character Traits */}
      {characterTraits.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 16, color: '#b3baff', marginBottom: 12, fontWeight: 600 }}>
            Identified Character Traits:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {characterTraits.map((trait, index) => (
              <span key={index} style={{
                background: '#4ade80',
                color: '#1a0933',
                padding: '0.3rem 0.8rem',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600
              }}>
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Opportunities */}
      <div>
        <div style={{ fontSize: 16, color: '#b3baff', marginBottom: 12, fontWeight: 600 }}>
          Job Opportunities Found:
        </div>
        <div style={{ fontSize: 14, color: '#b3baff' }}>
          {totalJobsMatched} suitable positions identified based on your skills and experience.
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ marginTop: 20, padding: '1rem', background: '#1a0933', borderRadius: 8 }}>
        <div style={{ fontSize: 16, color: '#ffd700', marginBottom: 8, fontWeight: 600 }}>
          Recommendations:
        </div>
        <ul style={{ color: '#b3baff', fontSize: 14, lineHeight: 1.5, margin: 0, paddingLeft: '1.5rem' }}>
          {overallScore >= 85 && (
            <li>Excellent candidate profile - consider applying to senior-level positions</li>
          )}
          {overallScore >= 70 && overallScore < 85 && (
            <li>Strong profile - focus on positions that match your highest-scoring job</li>
          )}
          {overallScore >= 55 && overallScore < 70 && (
            <li>Consider developing additional skills to improve your match percentage</li>
          )}
          {overallScore < 55 && (
            <li>Focus on building relevant technical skills and gaining more experience</li>
          )}
          <li>Highlight your character traits in interviews and cover letters</li>
          <li>Consider certifications in your target job's key technologies</li>
        </ul>
      </div>
    </div>
  );
};

export default FinalAssessment; 