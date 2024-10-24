'use client'

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Script from 'next/script';

export default function Home() {
  const [content, setContent] = useState<string>('');

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    console.log('Content was updated:', newContent);
  };

  return (
    <div>
      <h1>TinyMCE with FLITE in Next.js</h1>
      {/* Load the TinyMCE editor with FLITE plugin */}
      <Editor
        apiKey={'5mwypg9c08ih4fcpubmb57cavmibsx4ws639q0m85gy6b6hg'}
        value={content}
        init={{
          height: 500,
          plugins: 'flite', // Load FLITE plugin
          toolbar: 'flitefind flitelocate fliteinsert flitetrack fliteedit', // FLITE toolbar buttons
          menubar: false, // Remove default menubar
          flite_options: {
            track_changes: true, // Enable track changes
          },
        }}
        onEditorChange={handleEditorChange}
      />

      {/* Include the FLITE plugin */}
      <Script src="https://your-flite-plugin-url/flite-plugin.js" strategy="lazyOnload" />
    </div>
  );
}