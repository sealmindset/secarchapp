import React, { useState, useRef } from 'react'; // Add 'useRef' import
import './App.css';
import Modal from './Modal';
import SaveButton from './SaveButton';
import LoadButton from './LoadButton';
import PrintButton from './PrintButton';
import questions from './questions';
import FormattedAnswer from './FormattedAnswer';
import 'react-quill/dist/quill.snow.css';
import ChatGPTPopup from './ChatGPTPopup'; // Import the ChatGPTPopup component
import './ChatGPTPopup.css'

function App() {
  const [answers, setAnswers] = useState({});
  const [image, setImage] = useState(null);
  const [currentModalQuestionIndex, setCurrentModalQuestionIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const formattedAnswersRef = useRef(null); // Create a ref for the formatted answers container

  const openModal = (index) => {
    if (questions[index].type === 'image') {
        // If it's an image type question, directly open the file picker
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result);
                    setAnswers((prev) => ({
                        ...prev,
                        [index]: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    } else {
        setCurrentModalQuestionIndex(index);
    }
  };

  const closeModal = () => {
    setCurrentModalQuestionIndex(null);
  };

  const resetAll = () => {
    setAnswers({});  // Clear all answers
    setImage(null);  // Clear the image
  };

  return (
    <div className="app">
      <div className="formatted-answers" ref={formattedAnswersRef}> {/* Attach the ref to the container */}
        {questions.map((question, index) => (
          <FormattedAnswer
            key={index}
            question={question}
            content={answers[index]}
            onClick={() => openModal(index)}
            questionType={question.type}
          />
        ))}
      </div>
      <div className="buttons">
        <SaveButton answers={answers} image={image} setAnswers={setAnswers} setImage={setImage} />
        <LoadButton setAnswers={setAnswers} setImage={setImage} />
        <PrintButton contentRef={formattedAnswersRef} />
        <button onClick={() => setIsChatOpen(true)}>Chat with ChatGPT</button> {/* Button to trigger the ChatGPT popup */}
        <ChatGPTPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} /> {/* ChatGPT popup component */}
        <button className="reset-all" onClick={resetAll}>Reset All</button>
      </div>
      <Modal
        key={currentModalQuestionIndex}
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
        questionType={questions[currentModalQuestionIndex]?.type}
        setImage={setImage}
      >
        <h2>{questions[currentModalQuestionIndex]?.header}</h2>
        <p>{questions[currentModalQuestionIndex]?.detail}</p>
      </Modal>
    </div>
  );
}

export default App;
