import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, GraduationCap, Users, BrainCircuit } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    round: '1'
  });

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.className) return;
    
    sessionStorage.setItem('player_session', JSON.stringify(formData));
    navigate('/game');
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 gap-8">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-6xl font-black text-slate-800 leading-tight tracking-tight">
          PHÒNG THÍ NGHIỆM <span className="text-primary">NĂNG LƯỢNG</span>
        </h1>
        <p className="text-slate-500 text-xl font-medium max-w-md mx-auto">
          Thử thách Cử chỉ: Làm chủ các dạng năng lượng!
        </p>
      </motion.div>

      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleStart}
        className="bg-[#FAFAFA] p-10 rounded-[40px] border-4 border-slate-100 w-full max-w-md space-y-6"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Users className="w-4 h-4" /> Tên Học Sinh
            </label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl border-4 border-slate-100 focus:border-primary outline-none transition-all text-lg font-bold bg-white"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Lớp
            </label>
            <input 
              required
              type="text" 
              value={formData.className}
              onChange={e => setFormData({...formData, className: e.target.value})}
              className="w-full px-6 py-4 rounded-2xl border-4 border-slate-100 focus:border-primary outline-none transition-all text-lg font-bold bg-white"
              placeholder="Ví dụ: Lớp 6A"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-[24px] text-2xl shadow-[0_8px_0_#D84315] transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
        >
          <Play className="w-8 h-8 fill-current" /> BẮT ĐẦU
        </button>
      </motion.form>

      <div className="w-full max-w-md bg-white p-8 rounded-[40px] border-4 border-slate-100 space-y-6">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <BrainCircuit className="w-4 h-4" /> Cách Chơi
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-2xl border-l-8 border-secondary">
            <div className="w-10 h-10 bg-white text-secondary rounded-xl flex items-center justify-center font-black text-xl shadow-sm">A</div>
            <p className="text-slate-600 font-bold">Nghiêng đầu sang <span className="text-primary">TRÁI</span> để chọn <span className="text-primary">ĐÚNG</span></p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-2xl border-l-8 border-primary">
            <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-black text-xl shadow-sm">B</div>
            <p className="text-slate-600 font-bold">Nghiêng đầu sang <span className="text-primary">PHẢI</span> để chọn <span className="text-primary">SAI</span></p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-2xl border-l-8 border-accent">
            <div className="w-10 h-10 bg-white text-accent rounded-xl flex items-center justify-center font-black text-xl shadow-sm">✓</div>
            <p className="text-slate-600 font-bold"><span className="text-primary">GẬT ĐẦU</span> để <span className="text-primary">XÁC NHẬN</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="bg-blue-100 p-4 rounded-2xl text-center">
          <div className="text-blue-600 font-bold text-xl">10+</div>
          <div className="text-blue-500 text-xs font-bold uppercase">Câu hỏi</div>
        </div>
        <div className="bg-green-100 p-4 rounded-2xl text-center">
          <div className="text-green-600 font-bold text-xl">AI</div>
          <div className="text-green-500 text-xs font-bold uppercase">Cử chỉ</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-2xl text-center">
          <div className="text-purple-600 font-bold text-xl">Top</div>
          <div className="text-purple-500 text-xs font-bold uppercase">Xếp hạng</div>
        </div>
      </div>
    </div>
  );
};

