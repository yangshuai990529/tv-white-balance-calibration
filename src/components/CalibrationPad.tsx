import { useCalibration } from '../store/CalibrationContext';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const CalibrationPad = () => {
  const { whiteBalance, focusedElement, isPadActive } = useCalibration();

  // Map -10 to 10 into 0% to 100%
  const cursorX = ((whiteBalance.x + 10) / 20) * 100;
  const cursorY = ((whiteBalance.y + 10) / 20) * 100;

  const isFocused = focusedElement === 'calibration-pad';

  return (
    <div className="absolute top-[40px] right-[60px] w-[520px] flex flex-col items-center z-10">
      <h2 className="text-2xl font-light text-white/80 mb-6">白平衡控制台</h2>
      
      <div 
        className={clsx(
          "relative w-full aspect-square rounded-[32px] border transition-all duration-300",
          isFocused && !isPadActive ? "border-white shadow-focus scale-105 bg-tv-panel" : 
          isPadActive ? "border-tv-highlight shadow-glow scale-[1.08] bg-[#14151C]" : 
          "border-tv-border bg-tv-panel/50"
        )}
      >
        {/* Background Dot Matrix / Grid */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden opacity-20"
             style={{
               backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
               backgroundSize: '20px 20px',
               backgroundPosition: 'center'
             }}
        />

        {/* Axes */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 -translate-x-1/2" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10 -translate-y-1/2" />
        
        {/* Center Target */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-white/30 -translate-x-1/2 -translate-y-1/2" />

        {/* Axis Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-tv-highlight text-sm tracking-widest">绿色</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-tv-highlight text-sm tracking-widest">洋红</div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-tv-highlight text-sm tracking-widest transform origin-center">冷色</div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-tv-highlight text-sm tracking-widest transform origin-center">暖色</div>

        {/* Cursor */}
        <motion.div
          className="absolute w-12 h-12 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(255,255,255,0.6)] backdrop-blur-md flex items-center justify-center bg-white/10"
          animate={{
            left: `${cursorX}%`,
            top: `${cursorY}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ x: '-50%', y: '-50%' }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>

        {/* Instructions Overlay */}
        {isFocused && !isPadActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[32px] backdrop-blur-sm">
              <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-xl shadow-2xl">
                Press OK to Edit
              </div>
            </div>
        )}

      </div>
    </div>
  );
};
