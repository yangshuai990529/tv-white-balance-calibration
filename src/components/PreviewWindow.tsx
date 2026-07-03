import { useCalibration } from '../store/CalibrationContext';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IMAGES = [
  '/img1.jpg', // Local fallback 1 (Forest)
  '/img2.jpg', // Local fallback 2 (Ocean)
  '/img3.jpg', // Local fallback 3 (Mountain)
];

export const PreviewWindow = () => {
  const { mode, whiteBalance, grayLevel, focusedElement, imageIndex } = useCalibration();

  // Calculate overlay colors for simulation
  // X: -10 to 10 (Cool to Warm)
  // Y: -10 to 10 (Green to Magenta) (Y < 0 is Green, Y > 0 is Magenta)
  const warmCoolOpacity = Math.abs(whiteBalance.x) / 10;
  const warmCoolColor = whiteBalance.x > 0 ? 'rgba(255, 136, 0, 0.4)' : 'rgba(0, 136, 255, 0.4)';
  
  const greenMagentaOpacity = Math.abs(whiteBalance.y) / 10;
  const greenMagentaColor = whiteBalance.y > 0 ? 'rgba(255, 0, 255, 0.3)' : 'rgba(0, 255, 0, 0.3)';

  const isFocused = focusedElement === 'preview-window';

  return (
    <div className={clsx(
      "absolute top-[40px] left-[60px] w-[55%] h-[80%] rounded-[32px] overflow-hidden border transition-all duration-300",
      isFocused ? "border-white shadow-focus scale-105 z-20" : "border-white/10 shadow-glass bg-black"
    )}>
      <AnimatePresence mode="wait">
        {mode === 'real' ? (
          <motion.div
            key="real"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {IMAGES.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt="Demo"
                className={clsx(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
                  imageIndex === idx ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            
            {isFocused && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white bg-black/60 px-6 py-3 rounded-full backdrop-blur-md text-xl flex gap-6 items-center shadow-2xl z-50">
                <span className="px-3 py-1 bg-white/20 rounded-lg font-bold">←</span>
                <span>选择演示图片 ({imageIndex + 1}/{IMAGES.length})</span>
                <span className="px-3 py-1 bg-white/20 rounded-lg font-bold">→</span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="gray"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center items-center bg-black"
          >
            <div className="flex gap-4 items-center h-[60%] w-[90%]">
              {[5, 20, 35, 50, 65, 80, 95].map((level) => {
                const colorValue = Math.round((level / 100) * 255);
                const isSelected = grayLevel === level;
                const isFocused = focusedElement === 'grayscale-selector' && isSelected;
                
                return (
                  <div
                    key={level}
                    className={clsx(
                      "flex-1 h-full rounded-2xl flex items-end justify-center pb-8 text-2xl font-medium transition-all duration-300",
                      isFocused ? "ring-4 ring-white shadow-focus scale-[1.02] z-10" : ""
                    )}
                    style={{
                      backgroundColor: `rgb(${colorValue}, ${colorValue}, ${colorValue})`,
                      color: level > 50 ? 'black' : 'white'
                    }}
                  >
                    {level}%
                  </div>
                );
              })}
            </div>
            
            {focusedElement === 'grayscale-selector' && (
              <div className="absolute bottom-12 text-white/60 text-xl flex gap-4 items-center">
                <span className="px-3 py-1 bg-white/10 rounded-lg">←</span>
                <span>Select Grayscale Level</span>
                <span className="px-3 py-1 bg-white/10 rounded-lg">→</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Overlays to simulate White Balance changes */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-300"
        style={{ 
          backgroundColor: warmCoolColor, 
          opacity: warmCoolOpacity 
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color transition-opacity duration-300"
        style={{ 
          backgroundColor: greenMagentaColor, 
          opacity: greenMagentaOpacity 
        }}
      />
      {/* Slight brightness compensation to avoid image getting too dark with multiply/color blends */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{ 
          backgroundColor: 'white', 
          opacity: (warmCoolOpacity + greenMagentaOpacity) * 0.1 
        }}
      />
    </div>
  );
};
