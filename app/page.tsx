'use client'

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

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
          plugins: [
            'flite',
            // Core editing features
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Nov 7, 2024:
            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
          ],
          toolbar: 'flitefind flitelocate fliteinsert flitetrack fliteedit undo redo blocks fontfamily fontsize bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight checklist numlist bullist indent outdent emoticons charmap removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Johannes Skuterud',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],

          height: 500,
          flite_options: {
            track_changes: true, // Enable track changes,
            user: {
              userId: '3',
              name: 'Johannes'
            }
          },
          flite: {
            user: {
              userId: '3',
              name: 'Johannes'
            }
          },
          setup: (editor) => {
            editor.on('flite:init', (event) => {
              console.log('event', event)

            });
          }
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
