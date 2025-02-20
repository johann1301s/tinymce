'use client'

// pages/word/page.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import the PDF viewer with ssr: false to disable server-side rendering
const PdfViewer = dynamic(() => import('../../components/viewer'), { ssr: false });

const WordPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload and View PDF</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      {file && (
        <div style={{ marginTop: '20px' }}>
          <PdfViewer file={file} />
        </div>
      )}
    </div>
  );
};

export default WordPage;