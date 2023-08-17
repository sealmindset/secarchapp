import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import PrintButton from './PrintButton';
import ImageUpload from './ImageUpload';
import questions from './questions';
import FormattedAnswer from './FormattedAnswer';
import 'react-quill/dist/quill.snow.css';

function App() {
  const [answers, setAnswers] = useState({});
  const [image, setImage] = useState(null);
  const [currentModalQuestionIndex, setCurrentModalQuestionIndex] = useState(null);

  const openModal = (index) => {
    setCurrentModalQuestionIndex(index); // Update modal question index
  };

  const closeModal = () => {
    setCurrentModalQuestionIndex(null);
  };

  const saveAnswer = (editorContent) => {
    if (currentModalQuestionIndex !== null) {
      setAnswers((prev) => ({
        ...prev,
        [currentModalQuestionIndex]: editorContent,
      }));
      closeModal();
    }
  };

  return (
    <div className="app">
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      <div className="formatted-answers">
        {questions.map((question, index) => (
          <FormattedAnswer
            key={index}
            question={question}
            content={answers[index]} // Pass answer content to FormattedAnswer
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      <div className="buttons">
        <SaveButton data={answers} image={image} />
        <LoadButton setData={setAnswers} setImage={setImage} />
        <PrintButton />
        <ImageUpload setImage={setImage} />
      </div>
      <Modal
        isOpen={currentModalQuestionIndex !== null}
        onClose={closeModal}
        onSave={saveAnswer}
        initialAnswer={answers[currentModalQuestionIndex] || ''} // Initialize with empty string
      >
        <h2>{questions[currentModalQuestionIndex]?.header}</h2>
        <p>{questions[currentModalQuestionIndex]?.detail}</p>
      </Modal>
    </div>
  );
}

export default App;
