
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  examType: 'SSC' | 'HSC';
  setExamType: (type: 'SSC' | 'HSC') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setView, 
  isOpen, 
  setIsOpen,
  examType,
  setExamType
}) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: View.AI_MENTOR, label: 'AI Mentor', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: View.SUMMARIZER, label: 'Note Summarizer', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: View.RESOURCES, label: 'Resources', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-[#17191e] border-r border-gray-200 dark:border-gray-800
        transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:hidden'}
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Probaho</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">SSC/HSC Prep Engine</p>
          </div>
        </div>

        <div className="px-6 mb-6">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button 
              onClick={() => setExamType('SSC')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${examType === 'SSC' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            >
              SSC
            </button>
            <button 
              onClick={() => setExamType('HSC')}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${examType === 'HSC' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`}
            >
              HSC
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${currentView === item.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm ring-1 ring-blue-100 dark:ring-blue-900/50' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white">
            <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
            <p className="text-xs text-blue-100 mb-3">Get unlimited AI mentorship and premium mocks.</p>
            <button className="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Go Premium
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
