// PrintButton.jsx
import html2pdf from 'html2pdf.js';

function PrintButton() {
  const handlePrint = () => {
    // Hide the buttons
    const buttonsContainer = document.querySelector('.buttons');
    buttonsContainer.classList.add('print-hide');

    const content = document.querySelector('.app');
    const opt = {
      margin: 10,
      filename: 'SecurityReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save().then(() => {
      // Show the buttons again after saving the PDF
      buttonsContainer.classList.remove('print-hide');
    });
  };

  return <button onClick={handlePrint}>Print as PDF</button>;
}

export default PrintButton;
