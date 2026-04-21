import React from 'react';
import CinematicFade from './CinematicFade';
import SoftButton from './SoftButton';

interface PhaseIntroScreenProps {
  number: string;
  title: string;
  onReady: () => void;
  index: number;
}

const PhaseIntroScreen: React.FC<PhaseIntroScreenProps> = ({ number, title, onReady, index }) => (
  <CinematicFade keyId={`intro-${index}`}>
    <div className="flex flex-col items-center justify-center h-full px-6 text-center max-w-lg mx-auto z-10 relative">
      <span className="text-[10px] tracking-[0.4em] uppercase mb-4 opacity-40">
        {number}
      </span>
      <h2 className="font-serif text-4xl mb-6 text-white italic tracking-tight">{title}</h2>
      <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 mb-12">A new dialogue begins</p>
      <SoftButton onClick={onReady}>Begin Phase</SoftButton>
    </div>
  </CinematicFade>
);

export default PhaseIntroScreen;
