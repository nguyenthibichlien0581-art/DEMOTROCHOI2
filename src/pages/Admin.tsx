import React, { useState } from 'react';
import { useGameStore } from '../hooks/useGameStore';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Trash, AlertCircle } from 'lucide-react';

export const Admin: React.FC = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion, leaderboard, resetLeaderboard, resetQuestions } = useGameStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ text: '', correctAnswer: 'A' as 'A' | 'B' });

  const handleResetQuestions = () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục tất cả câu hỏi về mặc định không?')) {
      resetQuestions();
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addQuestion(formData);
    setFormData({ text: '', correctAnswer: 'A' });
    setIsAdding(false);
  };

  const handleUpdate = (id: string) => {
    updateQuestion({ id, ...formData });
    setEditingId(null);
    setFormData({ text: '', correctAnswer: 'A' });
  };

  const startEdit = (q: any) => {
    setEditingId(q.id);
    setFormData({ text: q.text, correctAnswer: q.correctAnswer });
  };

  return (
    <div className="py-4 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Bảng Điều Khiển Giáo Viên</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Quản lý nội dung thử thách khoa học</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleResetQuestions}
            className="bg-white border-4 border-slate-100 hover:border-primary text-slate-600 font-black px-6 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-sm"
          >
            KHÔI PHỤC MẶC ĐỊNH
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-secondary hover:bg-secondary/90 text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-secondary/20"
          >
            <Plus className="w-5 h-5" /> THÊM CÂU HỎI
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest">
            Câu hỏi <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-lg text-slate-500">{questions.length}</span>
          </h2>
          
          <div className="space-y-6">
            {isAdding && (
              <motion.form 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onSubmit={handleAdd}
                className="bg-[#FAFAFA] p-8 rounded-[32px] border-4 border-secondary/20 space-y-6"
              >
                <textarea 
                  required
                  className="w-full p-6 rounded-2xl border-4 border-slate-100 outline-none focus:border-secondary min-h-[120px] font-bold text-slate-700"
                  placeholder="Nhập nội dung câu hỏi..."
                  value={formData.text}
                  onChange={e => setFormData({...formData, text: e.target.value})}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <label className="font-black text-slate-400 uppercase tracking-widest text-xs">Đáp án đúng:</label>
                    <select 
                      className="p-3 rounded-xl border-4 border-slate-100 outline-none font-bold text-slate-700 bg-white"
                      value={formData.correctAnswer}
                      onChange={e => setFormData({...formData, correctAnswer: e.target.value as 'A' | 'B'})}
                    >
                      <option value="A">ĐÚNG (A)</option>
                      <option value="B">SAI (B)</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest text-xs">HỦY</button>
                    <button type="submit" className="bg-secondary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-md">LƯU</button>
                  </div>
                </div>
              </motion.form>
            )}

            {questions.map(q => (
              <div key={q.id} className="bg-white p-8 rounded-[32px] border-4 border-slate-50 shadow-sm flex justify-between gap-6 group hover:border-secondary/20 transition-all">
                {editingId === q.id ? (
                  <div className="w-full space-y-6">
                    <textarea 
                      className="w-full p-6 rounded-2xl border-4 border-slate-100 outline-none focus:border-secondary font-bold text-slate-700"
                      value={formData.text}
                      onChange={e => setFormData({...formData, text: e.target.value})}
                    />
                    <div className="flex justify-between items-center">
                      <select 
                        className="p-3 rounded-xl border-4 border-slate-100 outline-none font-bold text-slate-700 bg-white"
                        value={formData.correctAnswer}
                        onChange={e => setFormData({...formData, correctAnswer: e.target.value as 'A' | 'B'})}
                      >
                        <option value="A">ĐÚNG (A)</option>
                        <option value="B">SAI (B)</option>
                      </select>
                      <div className="flex gap-3">
                        <button onClick={() => setEditingId(null)} className="p-3 text-slate-400 hover:text-slate-600"><X className="w-6 h-6" /></button>
                        <button onClick={() => handleUpdate(q.id)} className="p-3 text-secondary hover:text-secondary/80"><Save className="w-6 h-6" /></button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <p className="font-bold text-slate-800 text-xl leading-relaxed">{q.text}</p>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-[0.2em] ${q.correctAnswer === 'A' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                        Đáp án: {q.correctAnswer === 'A' ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(q)} className="p-3 text-slate-300 hover:text-secondary transition-colors"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => deleteQuestion(q.id)} className="p-3 text-slate-300 hover:text-primary transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800 text-white p-10 rounded-[40px] space-y-8 shadow-xl">
            <h2 className="text-xl font-black flex items-center gap-3 uppercase tracking-widest">
              Bảng Xếp Hạng <Trash onClick={resetLeaderboard} className="w-5 h-5 text-primary cursor-pointer hover:text-primary/80 ml-auto" />
            </h2>
            <div className="space-y-6">
              {leaderboard.map((entry, i) => (
                <div key={entry.id} className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 font-black text-xs w-5">{i + 1}</span>
                    <div>
                      <p className="font-black text-sm">{entry.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{entry.className}</p>
                    </div>
                  </div>
                  <span className="font-black text-accent text-lg">{entry.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent/10 p-8 rounded-[32px] border-4 border-accent/20 flex gap-5">
            <AlertCircle className="w-8 h-8 text-accent shrink-0" />
            <div className="space-y-2">
              <p className="font-black text-slate-800 text-sm uppercase tracking-widest">Mẹo cho Giáo viên</p>
              <p className="text-xs text-slate-600 leading-relaxed font-bold">
                Sử dụng các câu hỏi Đúng/Sai ngắn gọn, súc tích. Học sinh sẽ nghiêng đầu để trả lời, vì vậy hãy tránh các câu quá dài!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
