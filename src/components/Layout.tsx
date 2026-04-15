import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Settings } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-[1024px] min-h-[768px] bg-white rounded-[40px] shadow-[0_20px_0_rgba(0,0,0,0.05)] border-[8px] border-secondary overflow-hidden flex flex-col">
        <header className="bg-secondary h-20 px-10 flex justify-between items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-accent w-10 h-10 rounded-full flex items-center justify-center text-slate-800 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase">Phòng Thí Nghiệm</span>
          </Link>
          <Link to="/admin" className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
            <Settings className="w-6 h-6" />
          </Link>
        </header>
        <main className="flex-grow overflow-y-auto">
          <div className="max-w-4xl mx-auto p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
