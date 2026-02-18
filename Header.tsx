
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  currentView: View;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, currentView }) => {
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#17191e]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
          {currentView.replace('_', ' ').toLowerCase()}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#17191e]"></span>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:ring-2 hover:ring-blue-500/20 transition-all">
          <img src="https://picsum.photos/100/100?random=1" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;
