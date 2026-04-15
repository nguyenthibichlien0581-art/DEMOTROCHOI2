import React, { useRef, useEffect } from 'react';
import { useFaceTracking, Gesture } from '../hooks/useFaceTracking';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Loader2, CheckCircle2 } from 'lucide-react';

interface WebcamTrackerProps {
  onGesture: (gesture: Gesture) => void;
  currentGesture: Gesture;
}

export const WebcamTracker: React.FC<WebcamTrackerProps> = ({ onGesture, currentGesture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { gesture, isLoaded, error } = useFaceTracking(videoRef.current);

  useEffect(() => {
    onGesture(gesture);
  }, [gesture, onGesture]);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-video bg-[#333] rounded-[24px] overflow-hidden border-[6px] border-[#EEE] shadow-2xl">
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4 bg-[#333] z-10">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
          <p className="font-bold animate-pulse">Đang khởi tạo Camera...</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center gap-4 bg-[#333] z-10">
          <div className="bg-primary/20 p-4 rounded-full">
            <Camera className="w-10 h-10 text-primary" />
          </div>
          <p className="font-bold text-sm text-primary">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-white text-slate-800 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest"
          >
            Thử lại
          </button>
        </div>
      )}
      
      <video 
        ref={videoRef}
        className="w-full h-full object-cover scale-x-[-1]"
        playsInline={true}
        muted={true}
      />

      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-white font-black text-xs opacity-80 flex flex-col items-center">
        <span className="text-primary text-lg">◄</span>
        <span>ĐÚNG</span>
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-white font-black text-xs opacity-30 flex flex-col items-center">
        <span>SAI</span>
        <span className="text-lg">►</span>
      </div>

      <AnimatePresence mode="wait">
        {currentGesture !== 'NONE' && (
          <motion.div 
            key={currentGesture}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-accent text-slate-800 px-6 py-2 rounded-xl font-black shadow-lg flex items-center gap-2 text-sm uppercase tracking-widest animate-pulse"
          >
            NHẬN DIỆN: {currentGesture === 'LEFT' ? 'TRÁI' : currentGesture === 'RIGHT' ? 'PHẢI' : 'GẬT ĐẦU'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
