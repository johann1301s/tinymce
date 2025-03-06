'use client'

// components/PdfViewer.tsx
import { Document, Page } from 'react-pdf';
import { Fragment, useState } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ file }: { file: File }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Fragment>
    <div style={{ background: 'black', display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
      <div style={{ background: 'white', height: '300px', width: '300px', maxWidth: '100%', overflow: 'hidden', padding: '20px 0' }}>
        <Document
          loading={'you'}
          file={URL.createObjectURL(file)}
          onLoadSuccess={onLoadSuccess}
        >
          <Page pageNumber={pageNumber} width={300}/>
        </Document>
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            style={{ marginRight: '10px' }}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            style={{ marginLeft: '10px' }}
          >
            Next
          </button>
        </div>
    </Fragment>
  );
};

export default PdfViewer;