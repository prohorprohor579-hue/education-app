
import React, { useState } from 'react';
import { summarizeNotes } from '../services/geminiService';

interface SummaryResult {
  title: string;
  summary: string;
  keyPoints: string[];
  definitions?: { term: string; definition: string }[];
}

const NoteSummarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!text.trim() || isSummarizing) return;
    setIsSummarizing(true);
    setError(null);
    try {
      const summary = await summarizeNotes(text);
      setResult(summary);
    } catch (e) {
      setError("Failed to summarize notes. Please try again with shorter text.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const clear = () => {
    setText('');
    setResult(null);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Smart Note Summarizer</h2>
        <p className="text-gray-500 dark:text-gray-400">Paste your long lecture notes, and let AI highlight the key concepts for your exam revision.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#17191e] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Input Notes</span>
              <button 
                onClick={clear}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear All
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your notes here (Math, Physics, Biology, etc.)..."
              className="w-full h-80 bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none custom-scrollbar text-sm"
            />
          </div>
          <button 
            onClick={handleSummarize}
            disabled={!text.trim() || isSummarizing}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:bg-gray-400 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSummarizing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Generate Summary
              </>
            )}
          </button>
          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
        </div>

        {/* Output Area */}
        <div className="bg-white dark:bg-[#17191e] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm min-h-[464px] relative">
          {!result && !isSummarizing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-40">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              <h3 className="text-lg font-bold">Your summary will appear here</h3>
              <p className="text-sm">Enter your notes to the left to get started</p>
            </div>
          )}

          {isSummarizing && (
            <div className="space-y-6">
              <div className="h-8 w-1/2 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
              <div className="h-24 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>
              </div>
            </div>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{result.title}</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Brief Summary</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.summary}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Key Points</h4>
                <ul className="space-y-3">
                  {result.keyPoints.map((point, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-5 h-5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">{i + 1}</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {result.definitions && result.definitions.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Definitions</h4>
                  <div className="space-y-4">
                    {result.definitions.map((def, i) => (
                      <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm block mb-1">{def.term}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{def.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="mt-8 flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                Save to PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteSummarizer;
