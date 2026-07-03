import { useCalibration } from '../store/CalibrationContext';
import { clsx } from 'clsx';

export const Header = () => {
  const { whiteBalance, mode, grayLevel, focusedElement } = useCalibration();
  const isFocused = focusedElement === 'mode-toggle';

  return (
    <header className="flex justify-between items-start w-full px-16 pt-12 z-20 relative">
      <div className="flex flex-col gap-3 max-w-[50%]">
        <h1 className="text-[56px] leading-tight font-light tracking-wide text-tv-highlight">白平衡校准</h1>
        <p className="text-2xl text-white/60 tracking-wider leading-snug">
          调整白平衡以消除偏色，还原真实的图像色彩。
        </p>
      </div>

      <div className="flex gap-12 text-right">
        <div className="flex flex-col gap-2 items-end">
          <span className="text-lg text-white/40 uppercase tracking-widest">预览模式</span>
          <div 
            className={clsx(
              "text-3xl font-medium px-6 py-3 rounded-2xl transition-all duration-300 border border-transparent",
              isFocused ? "bg-tv-panel shadow-focus scale-105 border-tv-border" : "text-white/80"
            )}
          >
            {mode === 'real' ? '真实场景' : '灰阶图'}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <span className="text-lg text-white/40 uppercase tracking-widest">状态</span>
          <div className="text-2xl font-medium text-white/80 flex flex-col items-end gap-1">
            <span>灰阶亮度: {grayLevel}%</span>
            <span>暖色/冷色: {whiteBalance.x > 0 ? `+${whiteBalance.x}` : whiteBalance.x}</span>
            <span>绿色/洋红: {whiteBalance.y > 0 ? `+${whiteBalance.y}` : whiteBalance.y}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
