import React from 'react';
import ReactFileReader from 'react-file-reader';

function LoadButton({ setAnswers, setImage }) {
  const handleLoad = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      if (data.image) {
        setImage(data.image);
        delete data.image;
      }
      setAnswers(data);
    };
    reader.readAsText(file);
  };

  return (
    <ReactFileReader handleFiles={handleLoad} fileTypes={['.json']}>
      <button>Load</button>
    </ReactFileReader>
  );
}

export default LoadButton;
