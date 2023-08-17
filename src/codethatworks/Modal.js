import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Modal.css';

function Modal({ isOpen, onClose, onSave, children, initialAnswer }) {
  const [editorContent, setEditorContent] = useState(initialAnswer || '');

  useEffect(() => {
    if (!isOpen && !initialAnswer) {
      setEditorContent('');
    }
  }, [isOpen, initialAnswer]);

  const handleSave = () => {
    onSave(editorContent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <p>Answer:</p>
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          className="modal-quill-editor"
        />
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
