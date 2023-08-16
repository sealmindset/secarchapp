// Question.js
import React from 'react';

function Question({ index, question, answer, onClick }) {
  return (
    <div className="question">
      <label>{question.header}:</label>
      <textarea
        readOnly
        value={answer}
        onClick={() => onClick(index)}
        className="answer-textarea"
      />
    </div>
  );
}

export default Question;
