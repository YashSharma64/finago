import React, { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';

const Chat = ({ userData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Get API key from environment variable
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Clean up Gemini API responses to remove internal thought processes
  const cleanResponse = (text) => {
    // Remove option-style formatting
    text = text.replace(/\*\*Option \d+.*?\*\*:?/gi, '');
    
    // Remove text in double asterisks that looks like internal thoughts
    text = text.replace(/\*\*(Which option is best.*?)\*\*/gi, '');
    text = text.replace(/\*\*(Assuming.*?)\*\*/gi, '');
    text = text.replace(/\*\*(.*?context.*?)\*\*/gi, '');
    
    // Remove quotes around responses
    text = text.replace(/["']([^"']*)["']/g, '$1');
    
    // If the response contains multiple options, just take the last one (usually the actual response)
    if (text.includes("Hi Vivek") || text.includes("Hi, Vivek")) {
      const sentences = text.split(/(?<=[.!?])\s+/);
      const lastSentences = sentences.slice(-3).join(' '); // Take the last 3 sentences
      
      if (lastSentences.length > 10) {
        text = lastSentences;
      }
    }
    
    return text.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInput('');
    setIsLoading(true);
    
    try {
      // Directly use the Gemini API with fetch
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `You are a personal finance AI assistant named Finago. Your user is ${userData?.name || 'Anonymous'}.
                
                Respond directly to the user's question without showing your thought process or multiple options.
                Be concise, conversational and helpful. Provide valuable financial advice.
                
                User's message: ${input}` }
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
      
      // Extract the response from the Gemini API format
      let assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      
      // Clean up the response
      assistantResponse = cleanResponse(assistantResponse);
      
      // Add assistant message
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: assistantResponse
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
        <div ref={messagesEndRef} />
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