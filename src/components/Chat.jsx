import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { buildTrainingContext } from '../utils/trainingContext';
import TypingText from './TypingText';
import '../styles/Chat.css';

const Chat = ({ userData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trainingContext, setTrainingContext] = useState('');
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const messagesEndRef = useRef(null);


  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  

  useEffect(() => {
    const loadContext = async () => {
      try {
        const context = await buildTrainingContext();
        setTrainingContext(context);
      } catch (error) {
        console.error("Error loading training context:", error);
      }
    };
    
    loadContext();
  }, []);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  
  const cleanResponse = (text) => {

    text = text.replace(/#{1,6}\s/g, '');
    

    text = text.replace(/\*\*/g, '');
    
    
    text = text.replace(/\s+/g, ' ');
    
    text = text.replace(/\s*\*\s*/g, '\n• ');
    

    text = text.replace(/\.\s+/g, '.\n\n');

    text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return text.trim();
  };

  {/* I have added this rate limiting state to the Chat component */}
  const [requestQueue, setRequestQueue] = useState([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [lastMinuteReset, setLastMinuteReset] = useState(Date.now());

  {/* I have added this rate limiting function to the Chat component */}
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const makeApiRequest = async (promptWithContext, retryCount = 0) => {
    const maxRetries = 3;
    const baseDelay = 2000; // 2 seconds base delay

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
                { text: promptWithContext }
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
        
        // Check if it's a quota error
        if (errorData.error?.message?.includes('Quota exceeded') || errorData.error?.message?.includes('quota')) {
          if (retryCount < maxRetries) {
            const delayTime = baseDelay * Math.pow(2, retryCount); // if the quota is exceeded, we will retry the request after a delay
            console.log(`Quota exceeded, retrying in ${delayTime}ms... (attempt ${retryCount + 1}/${maxRetries})`);
            setRateLimitMessage(`Rate limit hit, retrying in ${Math.ceil(delayTime/1000)} seconds...`);
            await delay(delayTime);
            setRateLimitMessage('');
            return makeApiRequest(promptWithContext, retryCount + 1);
          } else {
            setRateLimitMessage('Rate limit exceeded. Please wait a moment before trying again.');
            throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
          }
        }
        
        throw new Error(errorData.error?.message || 'Error calling Gemini API');
      }
      
      const data = await response.json();
      console.log('Gemini response:', data);
      return data;
    } catch (error) {
      if (retryCount < maxRetries && error.message.includes('Rate limit')) {
        const delayTime = baseDelay * Math.pow(2, retryCount);
        console.log(`Rate limit hit, retrying in ${delayTime}ms... (attempt ${retryCount + 1}/${maxRetries})`);
        setRateLimitMessage(`Rate limit hit, retrying in ${Math.ceil(delayTime/1000)} seconds...`);
        await delay(delayTime);
        setRateLimitMessage('');
        return makeApiRequest(promptWithContext, retryCount + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // there will be a minimum interval of 2 seconds between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    const minInterval = 2000; // 2 seconds
    
    // Reset request count every minute
    if (now - lastMinuteReset > 60000) {
      setRequestCount(0);
      setLastMinuteReset(now);
    }
    
    // we are checking if the request count is greater than 10
    if (requestCount >= 10) {
      setRateLimitMessage('Rate limit reached. Please wait a moment before sending another message.');
      setTimeout(() => setRateLimitMessage(''), 5000);
      return;
    }
    
    if (timeSinceLastRequest < minInterval) {
      const waitTime = Math.ceil((minInterval - timeSinceLastRequest) / 1000);
      setRateLimitMessage(`Please wait ${waitTime} seconds before sending another message.`);
      setTimeout(() => setRateLimitMessage(''), waitTime * 1000);
      return;
    }
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    setIsLoading(true);
    setLastRequestTime(now);
    setRequestCount(prev => prev + 1);
    
    try {
      const promptWithContext = `${trainingContext}

User: ${userData?.name || 'Anonymous'}
Date: ${new Date().toLocaleDateString()}
Previous messages: ${messages.map(m => `${m.role === 'user' ? 'User' : 'Finago'}: ${m.content}`).join('\n')}

Current question: ${input}

Instructions: Respond as Finago, the AI financial assistant. Follow all guidelines and restrictions in the training context above. Format your response using Markdown for readability.`;

      const data = await makeApiRequest(promptWithContext);
      
      let assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      assistantResponse = cleanResponse(assistantResponse);
      
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
            <p><TypingText text={`Hello ${userData?.name || 'there'}! Ask me anything about your finances, investments, or budgeting!`} delay={10} showCursor={true} /></p>
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
              <div className="message-content">
                {message.role === 'assistant' ? (
                  <TypingText text={cleanResponse(message.content)} delay={5} showCursor={true} />
                ) : (
                  message.content
                )}
              </div>
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
        {rateLimitMessage && (
          <div className="message assistant-message rate-limit-message">
            <span className="message-avatar">⚠️</span>
            <div className="message-content">
              {rateLimitMessage}
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
