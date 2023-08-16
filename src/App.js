import React, { useState } from 'react';
import './App.css';
import Modal from './Modal';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import PrintButton from './PrintButton';
import ImageUpload from './ImageUpload';
import Question from './Question'; // Import the new Question component
import questions from './questions'; // Import the question data

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [image, setImage] = useState(null); // Using 'image' instead of 'uploadedImage'

  const openModal = (index) => {
    setCurrentQuestionIndex(index);
    setCurrentAnswer(answers[index] || "");
  };

  const closeModal = () => {
    setCurrentQuestionIndex(null);
    setCurrentAnswer("");
  };

  const saveAnswer = () => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: currentAnswer
    }));
    closeModal();
  };

  return (
    <div className="app">
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          question={question}
          answer={answers[index] || ""}
          onClick={openModal}
        />
      ))}
      <Modal
        isOpen={currentQuestionIndex !== null}
        onClose={closeModal}
        onSave={saveAnswer}
      >
        {/* Content for the Modal */}
        <h2>{questions[currentQuestionIndex]?.header}</h2>
        <p>{questions[currentQuestionIndex]?.detail}</p>
        <textarea 
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          className="modal-textarea"
        />
      </Modal>
      <div className="buttons">
        <SaveButton data={answers} image={image} />
        <LoadButton setData={setAnswers} setImage={setImage} />
        <PrintButton />
        <ImageUpload setImage={setImage} />
      </div>
    </div>
  );
}

export default App;
