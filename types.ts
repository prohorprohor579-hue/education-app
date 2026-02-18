
export enum View {
  DASHBOARD = 'DASHBOARD',
  AI_MENTOR = 'AI_MENTOR',
  SUMMARIZER = 'SUMMARIZER',
  RESOURCES = 'RESOURCES',
  SETTINGS = 'SETTINGS'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
}

export interface StudyTask {
  id: string;
  subject: string;
  task: string;
  completed: boolean;
}
