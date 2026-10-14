import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCcw, FastForward } from 'lucide-react';
import { speechService } from '../utils/speech';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  label?: string;
  className?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  textToSpeak,
  label = 'ฟังเสียงบรรยาย',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(speechService.isSupported());
  }, []);

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
    } else {
      speechService.setRate(rate);
      speechService.speak(
        textToSpeak,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  const handleCycleRate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rates = [0.9, 1.0, 1.2];
    const currentIndex = rates.indexOf(rate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setRate(nextRate);
    speechService.setRate(nextRate);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechService.stop();
    speechService.setRate(rate);
    speechService.speak(
      textToSpeak,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 bg-amber-50/90 border border-amber-200/80 rounded-xl shadow-xs ${className}`}>
      <button
        type="button"
        onClick={handleTogglePlay}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          isPlaying
            ? 'bg-amber-600 text-white shadow-sm'
            : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-200/60'
        }`}
        title={isPlaying ? 'หยุดเสียง' : 'กดเพื่อฟังเสียงบรรยายภาษาไทย'}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <VolumeX className="w-3.5 h-3.5" />
            <span>หยุดเสียง</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-700" />
            <span>{label}</span>
          </>
        )}
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={handleReplay}
          className="p-1.5 text-amber-800 hover:bg-amber-200/70 rounded-md transition-colors"
          title="ฟังซ้ำจากเริ่มต้น"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      )}

      <button
        type="button"
        onClick={handleCycleRate}
        className="px-2 py-1 text-[11px] font-mono font-medium text-amber-800 hover:bg-amber-200/70 rounded-md transition-colors"
        title="ปรับความเร็วเสียง (0.9x / 1.0x / 1.2x)"
      >
        <span className="flex items-center gap-0.5">
          <FastForward className="w-2.5 h-2.5" />
          {rate}x
        </span>
      </button>
    </div>
  );
};
