import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Modal.css';

function Modal({ isOpen, onClose, onSave, children, initialAnswer }) {
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    // Update editor content when initialAnswer changes
    setEditorContent(initialAnswer || '');

    // Clear editor content when the modal opens with no initial answer
    if (isOpen && !initialAnswer) {
      setEditorContent('');
    }
  }, [isOpen, initialAnswer]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editorContent);
    onClose();
  };

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
