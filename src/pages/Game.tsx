import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { WebcamTracker } from '../components/WebcamTracker';
import { Gesture } from '../hooks/useFaceTracking';
import { storage } from '../utils/storage';
import { Question } from '../data/initialQuestions';
import { Trophy, ArrowLeft, Timer, BrainCircuit } from 'lucide-react';

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
  const [currentGesture, setCurrentGesture] = useState<Gesture>('NONE');
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

  useEffect(() => {
    const stored = storage.getQuestions();
    // Shuffle questions for variety
    setQuestions(stored.sort(() => Math.random() - 0.5));
    
    const session = sessionStorage.getItem('player_session');
    if (!session) navigate('/');
  }, [navigate]);

  const handleGesture = useCallback((gesture: Gesture) => {
    setCurrentGesture(gesture);
    
    if (feedback) return; // Don't allow input during feedback

    if (gesture === 'LEFT') {
      setSelectedAnswer('A');
    } else if (gesture === 'RIGHT') {
      setSelectedAnswer('B');
    } else if (gesture === 'NOD' && selectedAnswer) {
      handleConfirm();
    }
  }, [selectedAnswer, feedback]);

  const handleConfirm = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 10);
      setFeedback('CORRECT');
    } else {
      setFeedback('WRONG');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        finishGame();
      }
    }, 1500);
  };

  const finishGame = () => {
    const session = JSON.parse(sessionStorage.getItem('player_session') || '{}');
    const finalScore = score + (selectedAnswer === questions[currentIndex].correctAnswer ? 10 : 0);
    
    storage.saveLeaderboardEntry({
      id: Date.now().toString(),
      name: session.name,
      className: session.className,
      score: finalScore,
      date: new Date().toLocaleDateString()
    });
    
    sessionStorage.setItem('last_score', finalScore.toString());
    navigate('/result');
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col gap-8 py-4 h-full">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <WebcamTracker onGesture={handleGesture} currentGesture={currentGesture} />
          
          <div className="bg-[#F9F9F9] p-8 rounded-[32px] border-2 border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Điều khiển</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between text-sm font-bold text-slate-500">
                <span><span className="bg-slate-200 px-2 py-1 rounded-md font-mono text-slate-700 mr-2">NGHIÊNG ĐẦU</span> ĐỂ CHỌN</span>
                <span><span className="bg-slate-200 px-2 py-1 rounded-md font-mono text-slate-700 mr-2">GẬT ĐẦU</span> ĐỂ XÁC NHẬN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 flex flex-col h-full">
          <motion.div 
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#F5F5F5] p-10 rounded-[32px] border-l-[12px] border-primary shadow-sm min-h-[200px] flex flex-col justify-center relative overflow-hidden"
          >
            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className={`absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm ${feedback === 'CORRECT' ? 'bg-secondary/20' : 'bg-primary/20'}`}
                >
                  <div className={`text-6xl font-black ${feedback === 'CORRECT' ? 'text-secondary' : 'text-primary'}`}>
                    {feedback === 'CORRECT' ? 'CHÍNH XÁC!' : 'SAI RỒI!'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-2xl font-bold text-slate-800 leading-relaxed">
              {currentQuestion.text}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 flex-grow">
            <div className={`p-8 rounded-[32px] border-4 transition-all flex flex-col items-center justify-center gap-3 ${selectedAnswer === 'A' ? 'border-primary bg-orange-50 scale-105 shadow-lg' : 'border-slate-100 bg-[#FAFAFA]'}`}>
              <span className="text-5xl font-black text-primary">A</span>
              <span className="font-black text-slate-700 tracking-widest">ĐÚNG</span>
            </div>
            <div className={`p-8 rounded-[32px] border-4 transition-all flex flex-col items-center justify-center gap-3 ${selectedAnswer === 'B' ? 'border-primary bg-orange-50 scale-105 shadow-lg' : 'border-slate-100 bg-[#FAFAFA]'}`}>
              <span className="text-5xl font-black text-primary">B</span>
              <span className="font-black text-slate-700 tracking-widest">SAI</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-auto bg-[#F9F9F9] -mx-10 -mb-10 p-10 border-t-2 border-slate-100 flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-sm font-black text-primary uppercase tracking-widest">Câu hỏi {currentIndex + 1} / {questions.length}</span>
            <span className="text-sm font-black text-secondary uppercase tracking-widest">Điểm: {score}</span>
          </div>
          <div className="w-[400px] h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phiên học sinh</p>
          <p className="font-black text-slate-700">{JSON.parse(sessionStorage.getItem('player_session') || '{}').name || 'Nguyễn Văn A'}</p>
        </div>
      </footer>
    </div>
  );
};
