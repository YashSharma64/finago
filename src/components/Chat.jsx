import React, { useState } from 'react';
import '../styles/Chat.css';

const Chat = ({ userData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const formatResponse = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/#{1,6}\s/g, '')
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `User ${userData?.name || 'Anonymous'} asks about finance: ${input}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        throw new Error(errorData.error?.message || 'Error calling Gemini API');
      }
      
      const data = await response.json();
      console.log('Gemini response:', data);
      
      const rawResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      const formattedResponse = formatResponse(rawResponse);
      
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: formattedResponse
        }
      ]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `Sorry, I encountered an error with the AI service: ${error.message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <span className="ai-icon">🤖</span>
            <p>Hello {userData?.name || 'there'}! Ask me anything about your finances, investments, or budgeting!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <span className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </span>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message assistant-message">
            <span className="message-avatar">🤖</span>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <form className="chat-input-container" onSubmit={handleSubmit}>
        <div className="chat-input-wrapper">
          <input 
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about finances, investments, or budgeting"
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !input.trim()}
          >
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
