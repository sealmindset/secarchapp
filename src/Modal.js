import './Modal.css';
// Modal.jsx
function Modal({ isOpen, onClose, onSave, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onSave}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

