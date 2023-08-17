// LoadButton.jsx
import ReactFileReader from 'react-file-reader';

function LoadButton({ setData, setImage }) {
  const handleLoad = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      if (data.image) {
        setImage(data.image);
        delete data.image; // Remove the image data before setting the answers
      }
      setData(data);
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
