// ImageUpload.jsx
function ImageUpload({ setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return <input type="file" accept="image/png" onChange={handleImageChange} />;
}

export default ImageUpload;
