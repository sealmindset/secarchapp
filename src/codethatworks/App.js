import React, { useState, useRef } from 'react'; // Add 'useRef' import
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

  const formattedAnswersRef = useRef(null); // Create a ref for the formatted answers container

  const openModal = (index) => {
    setCurrentModalQuestionIndex(index);
  };

  const closeModal = () => {
    setCurrentModalQuestionIndex(null);
  };

  return (
    <div className="app">
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      <div className="formatted-answers" ref={formattedAnswersRef}> {/* Attach the ref to the container */}
        {questions.map((question, index) => (
          <FormattedAnswer
            key={index}
            question={question}
            content={answers[index]}
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      <div className="buttons">
        <SaveButton answers={answers} image={image} setAnswers={setAnswers} setImage={setImage} />
        <LoadButton setAnswers={setAnswers} setImage={setImage} />
        <PrintButton contentRef={formattedAnswersRef} />
        <ImageUpload setImage={setImage} />
      </div>
      <Modal
        isOpen={currentModalQuestionIndex !== null}
        onClose={closeModal}
        onSave={(editorContent) => {
          if (currentModalQuestionIndex !== null) {
            setAnswers((prev) => ({
              ...prev,
              [currentModalQuestionIndex]: editorContent,
            }));
            closeModal();
          }
        }}
        initialAnswer={answers[currentModalQuestionIndex] || ''}
      >
        <h2>{questions[currentModalQuestionIndex]?.header}</h2>
        <p>{questions[currentModalQuestionIndex]?.detail}</p>
      </Modal>
    </div>
  );
}

export default App;
