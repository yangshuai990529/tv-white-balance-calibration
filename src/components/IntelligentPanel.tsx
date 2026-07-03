import { useCalibration } from '../store/CalibrationContext';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

export const IntelligentPanel = () => {
  const { whiteBalance } = useCalibration();
  const [recommendation, setRecommendation] = useState('');
  const [estimatedTemp, setEstimatedTemp] = useState(6500);

  useEffect(() => {
    let temp = 6500 - (whiteBalance.x * 200); // Rough estimation: +x = warmer = lower temp. Wait, warmer is lower temp in Kelvin.
    setEstimatedTemp(temp);

    if (whiteBalance.x === 0 && whiteBalance.y === 0) {
      setRecommendation('Image is close to D65 Standard White Balance. Colors appear natural.');
    } else if (whiteBalance.x > 5 && Math.abs(whiteBalance.y) < 3) {
      setRecommendation('Image looks too warm. Move LEFT to cool down the picture.');
    } else if (whiteBalance.x < -5 && Math.abs(whiteBalance.y) < 3) {
      setRecommendation('Image looks too cool. Move RIGHT to warm up the picture.');
    } else if (whiteBalance.y < -5) {
      setRecommendation('Image has a green cast. Move DOWN to add magenta.');
    } else if (whiteBalance.y > 5) {
      setRecommendation('Image has a magenta cast. Move UP to add green.');
    } else {
      setRecommendation('Adjusting fine details. Ensure skin tones look natural.');
    }
  }, [whiteBalance]);

  return (
    <div className="absolute top-[760px] right-[60px] w-[520px] h-[160px] bg-tv-panel rounded-3xl border border-tv-border shadow-glass p-6 flex flex-col justify-between z-10">
      <div>
        <h3 className="text-lg text-white/50 uppercase tracking-widest mb-2">Intelligent Recommendation</h3>
        <p className="text-xl font-light leading-snug text-tv-highlight">
          {recommendation}
        </p>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white/40 text-base">
          Estimated Color Temp
        </div>
        <div className="text-3xl font-light">
          {estimatedTemp}K
        </div>
      </div>
    </div>
  );
};
