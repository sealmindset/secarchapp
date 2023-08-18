import React from 'react';
import html2pdf from 'html2pdf.js';

function PrintButton({ contentRef }) {
  const handlePrint = () => {
    const content = contentRef.current;
    const buttonsContainer = content.querySelector('.buttons');
    if (buttonsContainer) {
        buttonsContainer.classList.add('print-hide');
    }

    const opt = {
      margin: 10,
      filename: 'SecurityReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(content).set(opt).save().then(() => {
      buttonsContainer.classList.remove('print-hide');
    });
  };

  return <button onClick={handlePrint}>Print as PDF</button>;
}

export default PrintButton;
