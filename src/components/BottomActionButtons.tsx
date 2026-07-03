import { useCalibration } from '../store/CalibrationContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const BottomActionButtons = () => {
  const { focusedElement } = useCalibration();
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  // Quick listener to show applied toast if user long presses OK or we trigger it from useTVFocus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusedElement === 'btn-apply' && e.key === 'Enter') {
        setShowAppliedToast(true);
        setTimeout(() => setShowAppliedToast(false), 3000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement]);

  return (
    <>
      {/* Left Back Button */}
      <div className="absolute bottom-[40px] left-[60px] z-20">
        <button className={clsx(
          "px-8 py-5 rounded-full text-2xl font-medium transition-all duration-300",
          focusedElement === 'btn-back' 
            ? "bg-white text-black scale-105 shadow-focus" 
            : "bg-tv-panel text-white border border-tv-border"
        )}>
          返回
        </button>
      </div>

      {/* Right Action Buttons */}
      <div className="absolute bottom-[40px] right-[60px] w-[35%] flex justify-end gap-6 z-20">
        <button className={clsx(
          "px-8 py-5 rounded-full text-2xl font-medium transition-all duration-300",
          focusedElement === 'btn-reset' 
            ? "bg-white text-black scale-105 shadow-focus" 
            : "bg-tv-panel text-white border border-tv-border"
        )}>
          重置
        </button>
        <button className={clsx(
          "px-8 py-5 rounded-full text-2xl font-medium transition-all duration-300",
          focusedElement === 'btn-apply' 
            ? "bg-tv-highlight text-white scale-105 shadow-focus" 
            : "bg-tv-panel text-white border border-tv-border"
        )}>
          应用校准
        </button>
      </div>

      <AnimatePresence>
        {showAppliedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute bottom-[140px] right-[100px] bg-green-500 text-white px-8 py-4 rounded-2xl text-2xl font-medium shadow-2xl z-50"
          >
            Calibration Applied
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
