import React from 'react';
import { saveAs } from 'file-saver';

function SaveButton({ answers, image, setAnswers, setImage }) {
  const handleSave = () => {
    const dataToSave = { ...answers };
    if (image) {
      dataToSave.image = image;
    }

    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  return <button onClick={handleSave}>Save</button>;
}

export default SaveButton;
