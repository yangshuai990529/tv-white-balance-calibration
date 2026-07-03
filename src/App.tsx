import { Header } from './components/Header';
import { PreviewWindow } from './components/PreviewWindow';
import { CalibrationPad } from './components/CalibrationPad';
import { BottomActionButtons } from './components/BottomActionButtons';
import { useTVFocus } from './hooks/useTVFocus';
import { useEffect, useState } from 'react';

function TVApp() {
  useTVFocus();
  
  // Calculate window scale to always fit 1920x1080 inside the browser window
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / 1920;
      const scaleY = windowHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#050505] overflow-hidden relative">
      {/* This is the 1920x1080 TV viewport, scaled down/up to fit the browser and centered */}
      <div 
        className="tv-viewport absolute top-1/2 left-1/2 overflow-hidden flex flex-col"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#12141c] to-[#050505] opacity-50" />
        
        <Header />
        
        <div className="relative flex-1 w-full h-full">
          <PreviewWindow />
          <CalibrationPad />
          <BottomActionButtons />
        </div>
      </div>
    </div>
  );
}

export default TVApp;
