
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import AIChat from './AIChat';
import NoteSummarizer from './NoteSummarizer';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [examType, setExamType] = useState<'SSC' | 'HSC'>('SSC');

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard examType={examType} />;
      case View.AI_MENTOR:
        return <AIChat />;
      case View.SUMMARIZER:
        return <NoteSummarizer />;
      case View.RESOURCES:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full mb-6">
              <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Resource Library</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">Our digital library of NCTB textbooks, board questions, and test papers is coming soon.</p>
          </div>
        );
      default:
        return <Dashboard examType={examType} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] dark:bg-[#0b0e14] transition-colors duration-200">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        examType={examType}
        setExamType={setExamType}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} currentView={currentView} />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
