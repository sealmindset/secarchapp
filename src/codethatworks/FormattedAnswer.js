import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FormattedAnswer.css';

function FormattedAnswer({ question, content, onClick }) {
  return (
    <div className="formatted-answer" onClick={() => onClick()}>
      <h3>{question.header}</h3>
      <div className="modal-quill-editor">
        <ReactQuill
          value={content || ''} // Use content as the initial value
          readOnly={true}
          theme={null}
        />
      </div>
    </div>
  );
}

export default FormattedAnswer;
