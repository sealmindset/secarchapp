// SaveButton.jsx
import { saveAs } from 'file-saver';

function SaveButton({ data, image }) {
  const handleSave = () => {
    const blob = new Blob([JSON.stringify({ ...data, image }, null, 2)], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  return <button onClick={handleSave}>Save</button>;
}

export default SaveButton;
