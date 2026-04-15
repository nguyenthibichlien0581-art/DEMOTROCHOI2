import { useState, useEffect } from 'react';
import { Question, initialQuestions } from '../data/initialQuestions';
import { storage } from '../utils/storage';

export const useGameStore = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState(storage.getLeaderboard());

  useEffect(() => {
    const storedQuestions = storage.getQuestions();
    
    // Kiểm tra nếu dữ liệu cũ là tiếng Anh (dựa trên nội dung câu hỏi đầu tiên)
    const isEnglish = storedQuestions.length > 0 && 
                     storedQuestions[0].text.includes('Kinetic energy');

    if (storedQuestions.length === 0 || isEnglish) {
      storage.saveQuestions(initialQuestions);
      setQuestions(initialQuestions);
    } else {
      setQuestions(storedQuestions);
    }
  }, []);

  const addQuestion = (q: Omit<Question, 'id'>) => {
    const newQuestions = [...questions, { ...q, id: Date.now().toString() }];
    setQuestions(newQuestions);
    storage.saveQuestions(newQuestions);
  };

  const updateQuestion = (updatedQ: Question) => {
    const newQuestions = questions.map(q => q.id === updatedQ.id ? updatedQ : q);
    setQuestions(newQuestions);
    storage.saveQuestions(newQuestions);
  };

  const deleteQuestion = (id: string) => {
    const newQuestions = questions.filter(q => q.id !== id);
    setQuestions(newQuestions);
    storage.saveQuestions(newQuestions);
  };

  const refreshLeaderboard = () => {
    setLeaderboard(storage.getLeaderboard());
  };

  const resetLeaderboard = () => {
    storage.resetLeaderboard();
    setLeaderboard([]);
  };

  const resetQuestions = () => {
    storage.resetQuestions();
    storage.saveQuestions(initialQuestions);
    setQuestions(initialQuestions);
  };

  return {
    questions,
    leaderboard,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    refreshLeaderboard,
    resetLeaderboard,
    resetQuestions
  };
};
