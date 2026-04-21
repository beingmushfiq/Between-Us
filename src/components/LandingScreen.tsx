import React, { useState } from 'react';
import CinematicFade from './CinematicFade';
import AtmosphericBackground from './AtmosphericBackground';
import SoftButton from './SoftButton';
import { PlayerNames } from '../types';

interface LandingScreenProps {
  onBegin: (names: PlayerNames) => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onBegin }) => {
  const [names, setNames] = useState<PlayerNames>({ A: '', B: '' });
  const [showInputs, setShowInputs] = useState(false);

  const isValid = names.A.trim() !== '' && names.B.trim() !== '';

  return (
    <main className="relative min-h-screen font-sans selection:bg-white/10 flex items-center justify-center p-6 z-10 w-full overflow-hidden bg-[#06080a]">
      <AtmosphericBackground />
      <CinematicFade keyId={showInputs ? 'names' : 'landing'}>
        {!showInputs ? (
          <div className="flex flex-col items-center justify-center h-full max-w-sm mx-auto text-center z-10 relative">
            <header className="mb-8">
              <h1 className="font-serif text-5xl md:text-7xl font-normal text-white italic tracking-tight mb-4">Between Us</h1>
              <div className="h-px w-12 bg-white/20 mx-auto mb-4" aria-hidden="true" />
            </header>
            
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] opacity-40 mb-12 leading-loose">
              A space for honest connection.<br />
              You'll take turns. Be truthful.
            </p>
            
            <SoftButton onClick={() => setShowInputs(true)}>Start Experience</SoftButton>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto text-center z-10 relative space-y-12">
            <header className="space-y-2">
              <h2 className="font-serif text-3xl text-white italic">Who is here tonight?</h2>
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">Enter your names</p>
            </header>

            <div className="w-full space-y-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="First Player"
                  value={names.A}
                  onChange={(e) => setNames({ ...names, A: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/10 hover:border-white/30 focus:border-white/60 focus:bg-white/[0.08] transition-all outline-none py-4 px-6 text-center font-serif text-xl text-white italic placeholder:text-white/20 placeholder:font-sans placeholder:text-xs placeholder:tracking-[0.2em] placeholder:uppercase rounded-t-2xl"
                  autoFocus
                />
                <div className="absolute bottom-0 left-0 h-[1px] bg-white/40 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left w-full" />
              </div>

              <div className="relative group">
                <input
                  type="text"
                  placeholder="Second Player"
                  value={names.B}
                  onChange={(e) => setNames({ ...names, B: e.target.value })}
                  className="w-full bg-white/5 border-b border-white/10 hover:border-white/30 focus:border-white/60 focus:bg-white/[0.08] transition-all outline-none py-4 px-6 text-center font-serif text-xl text-white italic placeholder:text-white/20 placeholder:font-sans placeholder:text-xs placeholder:tracking-[0.2em] placeholder:uppercase rounded-t-2xl"
                />
                <div className="absolute bottom-0 left-0 h-[1px] bg-white/40 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left w-full" />
              </div>
            </div>

            <div className="pt-4 h-24 flex items-center justify-center">
              <SoftButton onClick={() => onBegin(names)} disabled={!isValid}>
                Begin Correlation
              </SoftButton>
            </div>
          </div>
        )}
      </CinematicFade>
    </main>
  );
};

export default LandingScreen;
