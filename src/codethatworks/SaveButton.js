import React from 'react';
import { saveAs } from 'file-saver';

function SaveButton({ answers, image, setAnswers, setImage }) {
  const handleSave = () => {
    const dataToSave = { ...answers };
    if (image) {
      dataToSave.image = image;
    }

    // Prompt the user for a filename
    const filename = window.prompt("Enter a filename:", "data.json");
    if (!filename) return;  // If the user cancels or enters nothing, exit the function

    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    saveAs(blob, filename);
  };

  return <button onClick={handleSave}>Save</button>;
}

export default SaveButton;
