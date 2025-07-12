import React, { useState } from 'react';
// @ts-ignore
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface ResumeUploaderProps {
  onExtractedText: (text: string) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onExtractedText }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFile(file);
    setLoading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async function () {
        try {
          const typedarray = new Uint8Array(this.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          
          let text = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item: any) => item.str).join(' ') + ' ';
            text += pageText;
          }
          
          setLoading(false);
          onExtractedText(text);
        } catch (error) {
          console.error('Error processing PDF:', error);
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading file:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && <p style={{ color: '#b3baff', marginTop: '0.5rem' }}>Uploaded: {file.name}</p>}
      {loading && <p style={{ color: '#ffd700', marginTop: '0.5rem' }}>Extracting text from PDF...</p>}
      {!loading && file && <p style={{ color: '#4ade80', marginTop: '0.5rem' }}>✓ PDF processed successfully</p>}
    </div>
  );
};

export default ResumeUploader; 