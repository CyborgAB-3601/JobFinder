import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResumeUploader from './components/ResumeUploader';
import ResumeSummaryCard from './components/ResumeSummaryCard';
import { extractKeywordsAI } from './utils/aiKeywordExtractor';
import JobResults from './components/JobResults';
import FinalAssessment from './components/FinalAssessment';
import TipsPage from './components/TipsPage';
import HowItWorksPage from './components/HowItWorksPage';
import AboutUsPage from './components/AboutUsPage';
import { getResumeLines, extractResumeSummary } from './utils/resumeSummaryExtractor';
import { JOBS } from './utils/jobs';
import './App.css';

interface KeywordCount {
  keyword: string;
  count: number;
}

function App() {
  const [resumeText, setResumeText] = useState('');
  const [keywords, setKeywords] = useState<KeywordCount[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const [parsedLines, setParsedLines] = useState<string[]>([]);
  const [resumeSummary, setResumeSummary] = useState<{
    name: string;
    education: string;
    experience: string;
    characterTraits: string[];
    highlightedEducation: string;
    highlightedExperience: string;
  } | null>(null);
  const [highestJobMatch, setHighestJobMatch] = useState<{
    title: string;
    percentage: number;
  } | null>(null);

  const handleExtractedText = (text: string) => {
    setResumeText(text);
    const foundKeywords = extractKeywordsAI(text);
    setKeywords(foundKeywords);
    setJobs(JOBS); // Use the jobs from jobs.ts
    setParsedLines(getResumeLines(text));
    
    // Extract resume summary with character traits
    const summary = extractResumeSummary(text);
    setResumeSummary(summary);
    
    // Calculate highest job match
    const calculateEligibilityPercentage = (job: any, keywords: any[]) => {
      const matchedJobKeywords = job.keywords.filter((jk: string) => 
        keywords.some(k => {
          const similarity = (a: string, b: string) => {
            a = a.replace(/\s+/g, '').toLowerCase();
            b = b.replace(/\s+/g, '').toLowerCase();
            if (!a.length && !b.length) return 1;
            if (!a.length || !b.length) return 0;
            const dist = (a: string, b: string) => {
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
            };
            return 1 - dist(a, b) / Math.max(a.length, b.length);
          };
          return similarity(k.keyword, jk) >= 0.7;
        })
      );
      return Math.round((matchedJobKeywords.length / job.keywords.length) * 100);
    };
    
    const jobMatches = JOBS.map(job => ({
      title: job.title,
      percentage: calculateEligibilityPercentage(job, foundKeywords)
    })).filter(job => job.percentage > 0);
    
    const highest = jobMatches.length > 0 ? jobMatches.reduce((max, job) => 
      job.percentage > max.percentage ? job : max
    ) : null;
    
    setHighestJobMatch(highest);
  };

  return (
    <Routes>
      <Route path="/" element={
        <div style={{ minHeight: '100vh', background: '#200848', color: 'white', fontFamily: 'Inter, sans-serif' }}>
          <Navbar />
          <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
            <div style={{ margin: '3rem 0 2rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ background: '#2a1053', borderRadius: 12, padding: '1rem 2rem', color: '#fff', fontSize: 18, minWidth: 220 }}>
                  <span style={{ color: '#ffd700', fontSize: 22 }}>★★★★★</span><br />
                  "Superb job matching service"
                </div>
                <div style={{ background: '#2a1053', borderRadius: 12, padding: '1rem 2rem', color: '#fff', fontSize: 18, minWidth: 220 }}>
                  <span style={{ color: '#ffd700', fontSize: 22 }}>★★★★★</span><br />
                  "Found my perfect role fast"
                </div>
                <div style={{ background: '#2a1053', borderRadius: 12, padding: '1rem 2rem', color: '#fff', fontSize: 18, minWidth: 220 }}>
                  <span style={{ color: '#ffd700', fontSize: 22 }}>★★★★★</span><br />
                  "Helped me find work quickly"
                </div>
              </div>
              <h1 style={{ fontSize: 56, fontWeight: 700, margin: '2rem 0 1rem 0', lineHeight: 1.1 }}>
                <span style={{ color: '#4e5cf7' }}>Explore new</span> jobs based on<br />your Resume
              </h1>
              <p style={{ fontSize: 22, color: '#b3baff', marginBottom: 32 }}>Find the best job with AI</p>
            </div>
            <ResumeUploader onExtractedText={handleExtractedText} />
            
            {resumeSummary && (
              <ResumeSummaryCard
                name={resumeSummary.name}
                education={resumeSummary.education}
                experience={resumeSummary.experience}
                characterTraits={resumeSummary.characterTraits}
                highlightedEducation={resumeSummary.highlightedEducation}
                highlightedExperience={resumeSummary.highlightedExperience}
              />
            )}
            
            <button
              style={{ margin: '1rem 0', padding: '0.5rem 1.5rem', borderRadius: 8, border: '1px solid #4e5cf7', background: showDebug ? '#4e5cf7' : 'transparent', color: showDebug ? 'white' : '#4e5cf7', cursor: 'pointer', fontWeight: 500 }}
              onClick={() => setShowDebug((v) => !v)}
            >
              {showDebug ? 'Hide Raw Resume Lines' : 'Show Raw Resume Lines'}
            </button>
            {showDebug && (
              <div style={{ background: '#1a0933', color: '#ffd700', borderRadius: 8, padding: 16, margin: '1rem auto', maxHeight: 300, overflowY: 'auto', textAlign: 'left', fontFamily: 'monospace', fontSize: 15 }}>
                {parsedLines.length > 0 ? parsedLines.map((line, idx) => (
                  <div key={idx}>{idx + 1}. {line}</div>
                )) : <div>No lines parsed.</div>}
              </div>
            )}
            <JobResults keywords={keywords} jobs={jobs} />
            
            {/* Final Assessment */}
            {resumeSummary && highestJobMatch && (
              <FinalAssessment
                characterTraits={resumeSummary.characterTraits}
                highestJobMatch={highestJobMatch}
                totalJobsMatched={jobs.filter(job => {
                  const matchedJobKeywords = job.keywords.filter((jk: string) => 
                    keywords.some(k => {
                      const similarity = (a: string, b: string) => {
                        a = a.replace(/\s+/g, '').toLowerCase();
                        b = b.replace(/\s+/g, '').toLowerCase();
                        if (!a.length && !b.length) return 1;
                        if (!a.length || !b.length) return 0;
                        const dist = (a: string, b: string) => {
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
                        };
                        return 1 - dist(a, b) / Math.max(a.length, b.length);
                      };
                      return similarity(k.keyword, jk) >= 0.7;
                    })
                  );
                  return matchedJobKeywords.length > 0;
                }).length}
              />
            )}
          </main>
        </div>
      } />
      <Route path="/tips" element={<TipsPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
    </Routes>
  );
}

export default App;
