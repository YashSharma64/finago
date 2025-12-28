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

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
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

Instructions: Respond as Finago, the AI financial assistant Who will get to Know the personal details of the user and will provide the best possible advice. Follow all guidelines and restrictions in the training context above. Format your response using Markdown for readability.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
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
      const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      
      // Implement robust letter-by-letter typing
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: ''
        }
      ]);

      const intervalId = setInterval(() => {
        setMessages(prev => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg.content.length < assistantResponse.length) {
            const nextContent = assistantResponse.substring(0, lastMsg.content.length + 1);
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...lastMsg,
              content: nextContent
            };
            return newMessages;
          } else {
            clearInterval(intervalId);
            return prev;
          }
        });
      }, 5); // Faster typing for better feel

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: `Sorry, I encountered an error with the AI service. This might be due to model availability or API version. Technical detail: ${error.message}`
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
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 p-8 gap-6 h-full min-h-[400px]">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center text-5xl animate-bounce duration-[3s]">AI</div>
            <div className="max-w-md space-y-2">
              <h3 className="text-white font-bold text-xl tracking-tight">Your AI Financial Companion</h3>
              <p className="text-sm font-light leading-relaxed">
                Hello {userData?.name || 'there'}! I'm Finago. I can help you with budgeting, investing, or retirement. Ask me anything about your finances!
              </p>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-[80%] ${message.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
          >
            <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center text-base md:text-lg shrink-0 shadow-lg ${message.role === 'user' ? 'bg-indigo-600' : 'bg-white/10 border border-white/20'}`}>
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className={`
              flex-1 p-4 md:p-5 rounded-[1.25rem] text-sm md:text-base leading-relaxed shadow-xl transition-all
              ${message.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/[0.04] text-white/90 border border-white/5 rounded-tl-none'}
            `}>
              {message.role === 'assistant' ? (
                <div className="markdown-content prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                <span className="font-medium">{message.content}</span>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="self-start flex gap-3 md:gap-5 items-start max-w-[85%] animate-pulse pb-4">
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
      <div className="p-4 md:p-6 bg-[#0a0a0c]/60 backdrop-blur-xl border-t border-white/5">
        <form 
          className="relative max-w-4xl mx-auto flex gap-3 items-center"
          onSubmit={handleSubmit}
        >
          <div className="relative flex-1 group">
            <input 
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Finago any financial question..."
              className="w-full bg-white/[0.03] border border-white/10 p-4 md:p-5 pr-12 rounded-2xl text-white text-sm md:text-base outline-none placeholder:text-white/20 focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all shadow-inner"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="bg-indigo-600 text-white p-4 md:p-5 rounded-2xl cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/20 flex items-center justify-center shrink-0"
            disabled={isLoading || !input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
