import React, { useState } from 'react';
import copy from 'clipboard-copy'; 
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';

function ChatGPTPopup({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const ORG_ID = process.env.REACT_APP_ORG_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;

  const sendMessage = async () => {
    const userMessage = input;
    setMessages([...messages, { type: 'user', text: userMessage }]);
    setInput('');
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: "gpt-3.5-turbo",  // <-- Add this line
          messages: [{ role: "user", content: userMessage }]
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Openai-Organization': ORG_ID
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.choices && data.choices.length > 0) {
          const assistantMessage = data.choices[0].message.content;  // <-- Modify this line
          setMessages(prevMessages => [...prevMessages, { type: 'chatgpt', text: assistantMessage }]);
        } else {
          console.error("Unexpected API response:", data);
          setMessages(prevMessages => [...prevMessages, { type: 'chatgpt', text: "Received an unexpected response from ChatGPT." }]);
        }
      } else {
        console.error("API returned an error:", data);
        let errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
        setMessages(prevMessages => [...prevMessages, { type: 'chatgpt', text: `Error: ${errorMessage || "Unknown error occurred."}` }]);
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages(prevMessages => [...prevMessages, { type: 'chatgpt', text: `Error fetching answer: ${error.message}` }]);
    }
  };
  
  const handleCopyToClipboard = (text) => {
    copy(text);
    // Optionally, you can set a state here to show a "Copied!" message to the user
  };

  if (!isOpen) return null;

  return (
    <Draggable>
      <Resizable>
        <div className="chat-popup">
          <div className="chat-header">
            <h3>Chat with ChatGPT</h3>
            <button onClick={onClose}>Close</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
                {/* Add a copy button next to each message */}
                <button className="copy-button" onClick={() => handleCopyToClipboard(msg.text)}>C</button>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </Resizable>
    </Draggable>    
  );
}

export default ChatGPTPopup;
