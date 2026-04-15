import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { storage } from '../utils/storage';
import { Trophy, RotateCcw, Home, Award, Medal } from 'lucide-react';

export const Result: React.FC = () => {
  const navigate = useNavigate();
  const lastScore = parseInt(sessionStorage.getItem('last_score') || '0');
  const leaderboard = storage.getLeaderboard();
  const session = JSON.parse(sessionStorage.getItem('player_session') || '{}');

  return (
    <div className="flex flex-col items-center py-4 gap-10">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="inline-block bg-accent p-8 rounded-full shadow-xl shadow-accent/20 mb-4">
          <Trophy className="w-16 h-16 text-slate-800 fill-current" />
        </div>
        <h1 className="text-5xl font-black text-slate-800 tracking-tight">Hoàn Thành Thử Thách!</h1>
        <p className="text-slate-500 text-xl font-medium">Làm tốt lắm, <span className="text-primary font-black">{session.name}</span>!</p>
        <div className="text-8xl font-black text-primary">{lastScore}</div>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em]">Điểm Đạt Được</p>
      </motion.div>

      <div className="w-full max-w-md space-y-8">
        <div className="bg-white rounded-[40px] border-4 border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-secondary px-8 py-5 flex items-center justify-between">
            <h2 className="font-black text-white flex items-center gap-3 tracking-widest uppercase text-sm">
              <Award className="w-5 h-5 text-accent" /> CÁC NHÀ KHOA HỌC NHÍ
            </h2>
          </div>
          <div className="divide-y-4 divide-slate-50">
            {leaderboard.map((entry, index) => (
              <div key={entry.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm ${
                    index === 0 ? 'bg-accent text-slate-800' : 
                    index === 1 ? 'bg-slate-200 text-slate-600' : 
                    index === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-black text-slate-800">{entry.name}</p>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{entry.className}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary text-xl">{entry.score}</p>
                  <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button 
            onClick={() => navigate('/game')}
            className="bg-white border-4 border-slate-100 hover:border-primary text-slate-700 font-black py-5 rounded-[24px] transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95"
          >
            <RotateCcw className="w-6 h-6" /> CHƠI LẠI
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-[24px] transition-all flex items-center justify-center gap-3 shadow-[0_8px_0_#D84315] active:translate-y-1 active:shadow-none"
          >
            <Home className="w-6 h-6" /> TRANG CHỦ
          </button>
        </div>
      </div>
    </div>
  );
};
