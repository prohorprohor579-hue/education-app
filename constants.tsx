
import React from 'react';

export const EXAM_DATES = {
  SSC: new Date('2025-02-15'),
  HSC: new Date('2025-04-10')
};

export const SUBJECTS = [
  { id: 'phy', name: 'Physics', progress: 65, color: '#3b82f6' },
  { id: 'chem', name: 'Chemistry', progress: 40, color: '#10b981' },
  { id: 'math', name: 'Math Higher', progress: 80, color: '#f59e0b' },
  { id: 'bio', name: 'Biology', progress: 30, color: '#ef4444' },
  { id: 'ban', name: 'Bangla', progress: 90, color: '#8b5cf6' },
  { id: 'eng', name: 'English', progress: 55, color: '#ec4899' },
];

export const MENTOR_SYSTEM_INSTRUCTION = `You are "Probaho AI", a specialized educational mentor for students in Bangladesh preparing for SSC (Secondary School Certificate) and HSC (Higher Secondary Certificate) exams. 
Your tone should be encouraging, academic yet accessible, and professional. 
You are an expert in the NCTB (National Curriculum and Textbook Board) curriculum. 
Answer questions clearly, provide step-by-step explanations for math and science, and suggest mnemonic devices for subjects like biology or history. 
Always prioritize the Bangladesh NCTB syllabus context.`;
