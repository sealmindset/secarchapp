// FormattedAnswer.jsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FormattedAnswer.css';

function FormattedAnswer({ question, content, onClick, questionType }) {
  return (
    <div className="formatted-answer" onClick={() => onClick()}>
        <h3>{question.header}</h3>
        <div className="modal-quill-editor">
            {questionType === 'image' ? (
                <div>
                    {content ? (
                        <img src={content} alt="Uploaded Diagram" style={{ maxWidth: '100%', height: 'auto' }} />
                    ) : (
                        "No image uploaded."
                    )}
                </div>
            ) : (
                <ReactQuill
                    value={content || ''}
                    readOnly={true}
                    theme={null}
                />
            )}
        </div>
    </div>
  );
}

export default FormattedAnswer;