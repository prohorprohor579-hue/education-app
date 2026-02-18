
import React, { useState, useEffect } from 'react';
import { EXAM_DATES, SUBJECTS } from '../constants';

interface DashboardProps {
  examType: 'SSC' | 'HSC';
}

const Dashboard: React.FC<DashboardProps> = ({ examType }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number }>({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = EXAM_DATES[examType];
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        setTimeLeft({ days, hours, mins });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [examType]);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-white dark:bg-[#17191e] p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative z-10 lg:flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">As-salamu alaykum, Student! 👋</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg">Your progress is looking solid. You've covered 58% of the {examType} syllabus. Keep it up!</p>
          </div>
          <div className="mt-6 lg:mt-0 flex gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 text-center min-w-[100px]">
              <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">{timeLeft.days}</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-500/80">Days Left</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/50 text-center min-w-[100px]">
              <span className="block text-2xl font-bold text-amber-600 dark:text-amber-400">{timeLeft.hours}</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-500/80">Hours</span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-center min-w-[100px]">
              <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">{timeLeft.mins}</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-500/80">Mins</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subject Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#17191e] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Syllabus Progress</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View Roadmap</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUBJECTS.map((subject) => (
                <div key={subject.id} className="group p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{subject.name}</span>
                    <span className="text-xs font-bold text-gray-500">{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out"
                      style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#17191e] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-lg mb-6">Weekly Study Plan</h3>
            <div className="space-y-4">
              {[
                { day: 'Mon', task: 'Physics: Chapter 4 numericals', status: 'Completed', time: '10:00 AM' },
                { day: 'Tue', task: 'Math: Calculus integration practice', status: 'In Progress', time: '02:30 PM' },
                { day: 'Wed', task: 'English: Grammar & Essay writing', status: 'Upcoming', time: '11:15 AM' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50">
                  <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-xl shadow-sm flex flex-col items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                    <span className="text-xs uppercase tracking-tighter opacity-70 leading-tight">{item.day}</span>
                    <span className="text-lg leading-tight">{i + 14}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{item.task}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                    item.status === 'In Progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#17191e] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Quiz Highlights</h3>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl mb-4 border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase mb-2">Recent Result</p>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">Model Test: Physics 1st Paper</h4>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">42/50</p>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Start New Practice Quiz
            </button>
          </div>

          <div className="bg-white dark:bg-[#17191e] p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-lg mb-4">AI Mentor Tip</h3>
            <div className="flex gap-3">
              <div className="w-10 h-10 shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "Try summarizing the 'Archimedes' Principle' in your own words. Teaching it to a friend (or your AI Mentor) is the best way to retain physics concepts!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
