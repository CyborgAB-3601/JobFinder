import React from 'react';

interface Job {
  title: string;
  keywords: string[];
  matchedKeywords?: string[];
  eligibilityPercentage?: number;
}

interface KeywordCount {
  keyword: string;
  count: number;
}

interface JobResultsProps {
  keywords: KeywordCount[];
  jobs: Job[];
}

// Levenshtein distance
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Similarity: 1 - (levenshtein / max length)
function similarity(a: string, b: string): number {
  a = a.replace(/\s+/g, '').toLowerCase();
  b = b.replace(/\s+/g, '').toLowerCase();
  if (!a.length && !b.length) return 1;
  if (!a.length || !b.length) return 0;
  const dist = levenshtein(a, b);
  return 1 - dist / Math.max(a.length, b.length);
}

const isFuzzyMatch = (word: string, jobKeywords: string[]): boolean => {
  return jobKeywords.some(jk => similarity(word, jk) >= 0.7); // Lowered threshold for better matching
};

const getMatchedKeywords = (job: Job, extracted: KeywordCount[]) => {
  // Return extracted keywords that fuzzy-match this job's keywords
  return extracted.filter(k => isFuzzyMatch(k.keyword, job.keywords));
};

const getMatchedJobKeywords = (job: Job, extracted: KeywordCount[]) => {
  // Return job keywords that fuzzy-match any extracted keyword
  return job.keywords.filter(jk => extracted.some(k => similarity(k.keyword, jk) >= 0.7));
};

const getUnmatchedJobKeywords = (job: Job, extracted: KeywordCount[]) => {
  // Return job keywords that don't fuzzy-match any extracted keyword
  return job.keywords.filter(jk => !extracted.some(k => similarity(k.keyword, jk) >= 0.7));
};

// Calculate eligibility percentage: (matched job keywords / total job keywords) * 100
const calculateEligibilityPercentage = (job: Job, keywords: KeywordCount[]): number => {
  const matchedJobKeywords = getMatchedJobKeywords(job, keywords);
  const eligibilityPercentage = Math.round((matchedJobKeywords.length / job.keywords.length) * 100);
  return eligibilityPercentage;
};

// Get color based on eligibility percentage
const getEligibilityColor = (percentage: number): string => {
  if (percentage >= 80) return '#4ade80'; // Green for excellent eligibility
  if (percentage >= 60) return '#fbbf24'; // Yellow for good eligibility
  if (percentage >= 40) return '#f97316'; // Orange for moderate eligibility
  return '#ef4444'; // Red for poor eligibility
};

const JobResults: React.FC<JobResultsProps> = ({ keywords, jobs }) => {
  // Only show jobs where at least one job keyword is matched by an extracted keyword
  const matchedJobs = jobs.filter(job => getMatchedJobKeywords(job, keywords).length > 0);
  
  // Sort jobs by eligibility percentage in descending order (highest first)
  const sortedJobs = matchedJobs.sort((a, b) => {
    const percentageA = calculateEligibilityPercentage(a, keywords);
    const percentageB = calculateEligibilityPercentage(b, keywords);
    return percentageB - percentageA; // Descending order
  });
  
  // For highlighting, collect all job keywords
  const allJobKeywords = jobs.flatMap(j => j.keywords);

  return (
    <div style={{ marginTop: '2rem', maxWidth: '1400px', margin: '2rem auto 0' }}>
      {keywords.length > 0 && (
        <>
          <h2 style={{ color: '#4e5cf7' }}>Extracted Keywords:</h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
            {keywords.map(k => {
              const isMatched = isFuzzyMatch(k.keyword, allJobKeywords);
              return (
                <li
                  key={k.keyword}
                  style={{
                    background: isMatched ? '#ffd700' : '#2a1053',
                    color: isMatched ? '#2a1053' : 'white',
                    borderRadius: 8,
                    padding: '0.3rem 0.8rem',
                    fontSize: 15,
                    fontWeight: isMatched ? 700 : 400,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {k.keyword}
                  {k.count > 1 && (
                    <span style={{
                      background: isMatched ? '#2a1053' : '#ffd700',
                      color: isMatched ? '#ffd700' : '#2a1053',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      minWidth: '20px'
                    }}>
                      {k.count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#4e5cf7' }}>Suitable Jobs:</h2>
        {sortedJobs.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '1.5rem', 
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {sortedJobs.map(job => {
              const matchedJobKeywords = getMatchedJobKeywords(job, keywords);
              const eligibilityPercentage = calculateEligibilityPercentage(job, keywords);
              const eligibilityColor = getEligibilityColor(eligibilityPercentage);
              
              return (
                <div key={job.title} style={{ 
                  background: '#2a1053', 
                  borderRadius: 12, 
                  padding: '1.5rem', 
                  boxShadow: '0 2px 12px #0002',
                  height: 'fit-content',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#ffd700', marginBottom: 12, lineHeight: '1.3' }}>{job.title}</div>
                  
                  {/* Eligibility Percentage Gauge */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: '#b3baff', fontWeight: 600 }}>Eligibility:</span>
                      <span style={{ fontSize: 16, color: eligibilityColor, fontWeight: 700 }}>{eligibilityPercentage}%</span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: 8, 
                      background: '#1a0933', 
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${eligibilityPercentage}%`,
                        height: '100%',
                        background: eligibilityColor,
                        borderRadius: 4,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    <div style={{ 
                      fontSize: 11, 
                      color: '#b3baff', 
                      marginTop: 4,
                      textAlign: 'center'
                    }}>
                      {eligibilityPercentage >= 80 ? 'Excellent Eligibility' : 
                       eligibilityPercentage >= 60 ? 'Good Eligibility' : 
                       eligibilityPercentage >= 40 ? 'Moderate Eligibility' : 'Poor Eligibility'}
                    </div>
                    <div style={{ 
                      fontSize: 10, 
                      color: '#b3baff', 
                      marginTop: 2,
                      textAlign: 'center'
                    }}>
                      {matchedJobKeywords.length} of {job.keywords.length} required skills
                    </div>
                  </div>
                  
                  <div style={{ fontSize: 14, color: '#b3baff', marginBottom: 8, fontWeight: 600 }}>Matched Skills:</div>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', listStyle: 'none', padding: 0, marginBottom: 12 }}>
                    {matchedJobKeywords.map(word => (
                      <li key={word} style={{ background: '#ffd700', color: '#2a1053', borderRadius: 6, padding: '0.25rem 0.6rem', fontWeight: 700, fontSize: '12px' }}>{word}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: '#b3baff', fontSize: 18, marginTop: 16 }}>No suitable jobs found based on your resume keywords.</p>
        )}
      </div>
      {/* Matched keywords per job section */}
      {sortedJobs.length > 0 && (
        <div style={{ marginTop: '2.5rem', background: '#23104a', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#4e5cf7', marginBottom: 16 }}>Eligibility Analysis per Job</h2>
          {sortedJobs.map(job => {
            const matched = getMatchedKeywords(job, keywords);
            const eligibilityPercentage = calculateEligibilityPercentage(job, keywords);
            return (
              <div key={job.title} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, color: '#ffd700' }}>{job.title}</div>
                  <div style={{ fontSize: 16, color: getEligibilityColor(eligibilityPercentage), fontWeight: 700 }}>
                    {eligibilityPercentage}% Eligible
                  </div>
                </div>
                {matched.length > 0 ? (
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, marginTop: 6 }}>
                    {matched.map(k => (
                      <li key={k.keyword} style={{ 
                        background: '#ffd700', 
                        color: '#2a1053', 
                        borderRadius: 8, 
                        padding: '0.3rem 0.8rem', 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        {k.keyword}
                        {k.count > 1 && (
                          <span style={{
                            background: '#2a1053',
                            color: '#ffd700',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            minWidth: '20px'
                          }}>
                            {k.count}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ color: '#b3baff', fontSize: 15 }}>No keywords matched.</span>
                )}
                
                {/* Unmatched Requirements in Analysis Section */}
                {(() => {
                  const unmatchedJobKeywords = getUnmatchedJobKeywords(job, keywords);
                  if (unmatchedJobKeywords.length > 0) {
                    return (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 14, color: '#b3baff', marginBottom: 6 }}>Additional Requirements:</div>
                        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                          {unmatchedJobKeywords.map(word => (
                            <li key={word} style={{ 
                              background: '#6b7280', 
                              color: '#ffffff', 
                              borderRadius: 8, 
                              padding: '0.3rem 0.8rem', 
                              fontWeight: 500, 
                              opacity: 0.8 
                            }}>
                              {word}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobResults; 