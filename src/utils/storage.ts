import { Question } from '../data/initialQuestions';

export interface LeaderboardEntry {
  id: string;
  name: string;
  className: string;
  score: number;
  date: string;
}

const QUESTIONS_KEY = 'energy_quest_questions';
const LEADERBOARD_KEY = 'energy_quest_leaderboard';

export const storage = {
  getQuestions: (): Question[] => {
    const stored = localStorage.getItem(QUESTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  saveQuestions: (questions: Question[]) => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  },
  getLeaderboard: (): LeaderboardEntry[] => {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  },
  saveLeaderboardEntry: (entry: LeaderboardEntry) => {
    const leaderboard = storage.getLeaderboard();
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard.slice(0, 10)));
  },
  resetLeaderboard: () => {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([]));
  },
  resetQuestions: () => {
    localStorage.removeItem(QUESTIONS_KEY);
  }
};
