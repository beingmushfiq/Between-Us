import React, { useState, useEffect } from 'react';
import CinematicFade from './CinematicFade';
import SoftButton from './SoftButton';

interface PassScreenProps {
  message: string;
  subtext: string;
  onReady: () => void;
}

const PassScreen: React.FC<PassScreenProps> = ({ message, subtext, onReady }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 2000); // 2s mandatory delay for emotional pacing
    return () => clearTimeout(t);
  }, []);

  return (
    <CinematicFade keyId={message}>
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-12 max-w-sm mx-auto z-10 relative">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl md:text-3xl leading-snug italic text-white">{message}</h2>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] opacity-40">{subtext}</p>
        </div>
        <div className="h-12 flex items-center justify-center mt-4">
          <SoftButton onClick={onReady} disabled={!isReady}>
            Ready
          </SoftButton>
        </div>
      </div>
    </CinematicFade>
  );
};

export default PassScreen;
