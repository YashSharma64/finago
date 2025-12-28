import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { buildTrainingContext } from '../utils/trainingContext';
import TypingText from './TypingText';

const Chat = ({ userData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trainingContext, setTrainingContext] = useState('');
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    setInput('');
    setIsLoading(true);
    
    try {
      const promptWithContext = `${trainingContext}

User: ${userData?.name || 'Anonymous'}
Date: ${new Date().toLocaleDateString()}
Previous messages: ${messages.map(m => `${m.role === 'user' ? 'User' : 'Finago'}: ${m.content}`).join('\n')}

Current question: ${input}

Instructions: Respond as Finago, the AI financial assistant. Follow all guidelines and restrictions in the training context above. Format your response using Markdown for readability.`;

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
        throw new Error(errorData.error?.message || 'Error calling Gemini API');
      }
      
      const data = await response.json();
      
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
    <div className="flex flex-col h-full w-full bg-[#070708] overflow-hidden relative rounded-[2rem] border border-white/5 shadow-2xl">
      {/* Scrollable Messages Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col gap-6 scroll-smooth pb-32">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 p-8 gap-6 h-full">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center text-5xl animate-bounce duration-[3s]">🤖</div>
            <div className="max-w-md space-y-2">
              <h3 className="text-white font-bold text-xl tracking-tight">Your AI Financial Companion</h3>
              <p className="text-sm font-light leading-relaxed">
                <TypingText text={`Hello ${userData?.name || 'there'}! I'm Finago. I can help you with budgeting, investing, or retirement. Ask me anything about your finances!`} delay={10} showCursor={true} />
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex gap-3 md:gap-5 max-w-[95%] md:max-w-[85%] ${message.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-base md:text-xl shrink-0 shadow-lg ${message.role === 'user' ? 'bg-indigo-600' : 'bg-white/5 border border-white/10'}`}>
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className={`
                flex-1 p-4 md:p-6 rounded-[1.5rem] text-sm md:text-base leading-relaxed shadow-xl transition-all
                ${message.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white/[0.03] text-white/90 border border-white/5 rounded-tl-none font-light'}
              `}>
                {message.role === 'assistant' ? (
                  <TypingText text={cleanResponse(message.content)} delay={5} showCursor={true} />
                ) : (
                  <span className="font-semibold">{message.content}</span>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="self-start flex gap-3 md:gap-5 items-start max-w-[85%] animate-pulse">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white shrink-0">🤖</div>
            <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem] rounded-tl-none flex items-center gap-2 w-24">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#070708] via-[#070708]/90 to-transparent">
        <form 
          className="relative max-w-4xl mx-auto group"
          onSubmit={handleSubmit}
        >
          <input 
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Finago anything..."
            className="w-full bg-white/[0.05] border border-white/10 p-4 md:p-5 pr-16 md:pr-20 rounded-2xl text-white text-sm md:text-base outline-none placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all shadow-2xl backdrop-blur-md"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2.5 md:p-3 rounded-xl cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
            disabled={isLoading || !input.trim()}
          >
            <span className="text-xl md:text-2xl">🔍</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
