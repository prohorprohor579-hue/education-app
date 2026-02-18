
import React, { useState, useRef, useEffect } from 'react';
import { getAIMentorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your Probaho AI Mentor. Whether it's Physics, Math, or Bangla literature, I'm here to help you ace your SSC/HSC exams. What are we studying today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await getAIMentorResponse(input, history);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: Date.now() }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0b0e14]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8 space-y-6"
      >
        <div className="max-w-4xl mx-auto space-y-6 pb-24">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === 'assistant' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {msg.role === 'assistant' ? 'AI' : 'Me'}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-[#17191e] border border-gray-100 dark:border-gray-800 rounded-tl-none text-gray-800 dark:text-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600/50"></div>
                <div className="bg-white dark:bg-[#17191e] border border-gray-100 dark:border-gray-800 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-4 lg:p-8 bg-gradient-to-t from-white dark:from-[#0b0e14] via-white dark:via-[#0b0e14] to-transparent pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about the NCTB syllabus..."
              className="w-full bg-white dark:bg-[#17191e] border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all resize-none shadow-xl custom-scrollbar"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:bg-gray-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-500 mt-2">Probaho AI can make mistakes. Verify important info with textbooks.</p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
