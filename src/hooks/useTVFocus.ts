import { useEffect } from 'react';
import { useCalibration } from '../store/CalibrationContext';

export const useTVFocus = () => {
  const { 
    focusedElement, setFocusedElement, 
    mode, setMode, 
    setWhiteBalance,
    grayLevel, setGrayLevel,
    isPadActive, setIsPadActive,
    setImageIndex
  } = useCalibration();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (isPadActive) {
        if (key === 'ArrowUp') setWhiteBalance(p => ({ ...p, y: Math.max(p.y - 1, -10) }));
        else if (key === 'ArrowDown') setWhiteBalance(p => ({ ...p, y: Math.min(p.y + 1, 10) }));
        else if (key === 'ArrowLeft') setWhiteBalance(p => ({ ...p, x: Math.max(p.x - 1, -10) }));
        else if (key === 'ArrowRight') setWhiteBalance(p => ({ ...p, x: Math.min(p.x + 1, 10) }));
        else if (key === 'Enter' || key === 'Escape' || key === 'Backspace') {
          setIsPadActive(false);
        }
        else if (key === 'm' || key === 'M') {
          setWhiteBalance({ x: 0, y: 0 });
        }
        return;
      }

      const FOCUS_ORDER = mode === 'real' 
        ? ['mode-toggle', 'preview-window', 'calibration-pad', 'btn-reset', 'btn-apply', 'btn-back']
        : ['mode-toggle', 'grayscale-selector', 'calibration-pad', 'btn-reset', 'btn-apply', 'btn-back'];

      const currentIndex = FOCUS_ORDER.indexOf(focusedElement);
      let nextIndex = currentIndex !== -1 ? currentIndex : 0;

      if (key === 'ArrowDown') {
        nextIndex = Math.min(currentIndex + 1, FOCUS_ORDER.length - 1);
      } else if (key === 'ArrowUp') {
        nextIndex = Math.max(currentIndex - 1, 0);
      } else if (key === 'ArrowLeft') {
        if (focusedElement === 'mode-toggle') setMode('real');
        else if (focusedElement === 'preview-window') {
           setImageIndex(p => (p - 1 + 3) % 3);
        }
        else if (focusedElement === 'grayscale-selector') {
          const levels = [5, 20, 35, 50, 65, 80, 95];
          const idx = levels.indexOf(grayLevel);
          if (idx > 0) setGrayLevel(levels[idx - 1]);
        }
      } else if (key === 'ArrowRight') {
        if (focusedElement === 'mode-toggle') setMode('grayscale');
        else if (focusedElement === 'preview-window') {
           setImageIndex(p => (p + 1) % 3);
        }
        else if (focusedElement === 'grayscale-selector') {
          const levels = [5, 20, 35, 50, 65, 80, 95];
          const idx = levels.indexOf(grayLevel);
          if (idx < levels.length - 1) setGrayLevel(levels[idx + 1]);
        }
      } else if (key === 'Enter') {
        if (focusedElement === 'calibration-pad') {
           setIsPadActive(true);
        } else if (focusedElement === 'btn-reset') {
           setWhiteBalance({ x: 0, y: 0 });
        } else if (focusedElement === 'btn-apply') {
           // Provide some visual feedback later
        } else if (focusedElement === 'btn-back') {
           // Back action
        }
      } else if (key === 'm' || key === 'M') {
         setWhiteBalance({ x: 0, y: 0 });
      }
      
      if (nextIndex !== currentIndex) {
        setFocusedElement(FOCUS_ORDER[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedElement, mode, grayLevel, isPadActive, setFocusedElement, setMode, setWhiteBalance, setGrayLevel, setIsPadActive]);
};
