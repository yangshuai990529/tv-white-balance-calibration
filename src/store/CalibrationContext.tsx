import React, { createContext, useContext, useState, ReactNode } from 'react';

type Mode = 'real' | 'grayscale';

export interface CalibrationState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  whiteBalance: { x: number; y: number }; 
  setWhiteBalance: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  grayLevel: number;
  setGrayLevel: (level: number) => void;
  focusedElement: string;
  setFocusedElement: (id: string) => void;
  isPadActive: boolean;
  setIsPadActive: (active: boolean) => void;
  imageIndex: number;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CalibrationContext = createContext<CalibrationState | undefined>(undefined);

export const CalibrationProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('real');
  const [whiteBalance, setWhiteBalance] = useState({ x: 0, y: 0 }); // -10 to 10
  const [grayLevel, setGrayLevel] = useState(50);
  const [focusedElement, setFocusedElement] = useState('mode-toggle');
  const [isPadActive, setIsPadActive] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <CalibrationContext.Provider
      value={{
        mode,
        setMode,
        whiteBalance,
        setWhiteBalance,
        grayLevel,
        setGrayLevel,
        focusedElement,
        setFocusedElement,
        isPadActive,
        setIsPadActive,
        imageIndex,
        setImageIndex,
      }}
    >
      {children}
    </CalibrationContext.Provider>
  );
};

export const useCalibration = () => {
  const context = useContext(CalibrationContext);
  if (context === undefined) {
    throw new Error('useCalibration must be used within a CalibrationProvider');
  }
  return context;
};
