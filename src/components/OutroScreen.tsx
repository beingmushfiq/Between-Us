import React from 'react';
import CinematicFade from './CinematicFade';
import AtmosphericBackground from './AtmosphericBackground';
import { PhaseData, PhaseAnswers, PlayerNames } from '../types';

interface OutroScreenProps {
  phases: PhaseData[];
  allAnswers: Record<string, PhaseAnswers>;
  playerNames: PlayerNames;
}

const OutroScreen: React.FC<OutroScreenProps> = ({ phases, allAnswers, playerNames }) => {
  return (
    <main className="relative min-h-screen font-sans selection:bg-white/10 p-6 md:p-12 overflow-y-auto z-10 w-full flex flex-col items-center">
      <AtmosphericBackground />
      <CinematicFade keyId="outro">
        <div className="max-w-2xl w-full mx-auto py-16 space-y-24">
          <div className="text-center space-y-4 mb-20">
            <h2 className="font-serif text-4xl text-white">The Thread Between You</h2>
            <p className="text-[11px] tracking-[0.4em] uppercase opacity-40">Everything Revealed</p>
          </div>
          
          {phases.map((phase) => {
            const ans = allAnswers[phase.id];
            if (!ans) return null;
            
            return (
              <section key={phase.id} className="relative flex flex-col gap-12">
                {/* Visual Connector */}
                <div className="absolute left-1/2 top-10 bottom-[-48px] w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5 hidden md:block" aria-hidden="true" />
                
                <div className="text-center relative z-10 w-full mb-8">
                  <span className="bg-[#06080a] px-4 text-[10px] tracking-[0.4em] uppercase opacity-40 border border-white/5 py-1 rounded-full">{phase.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">
                  <div className="space-y-4 text-left md:text-right">
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-40">{playerNames.A}</p>
                    <blockquote className="font-serif text-lg md:text-xl text-white/90 leading-relaxed italic pr-0 md:pr-4">
                      "{ans.A}"
                    </blockquote>
                  </div>
                  <div className="space-y-4 text-left">
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-40">{playerNames.B}</p>
                    <blockquote className="font-serif text-lg md:text-xl text-white/90 leading-relaxed italic pl-0 md:pl-4">
                      "{ans.B}"
                    </blockquote>
                  </div>
                </div>
              </section>
            );
          })}
          
          <div className="text-center mt-32 pb-32">
            <p className="font-serif text-2xl opacity-60 italic">This is what connects you.</p>
            <div className="mt-8">
               <button 
                onClick={() => window.location.reload()} 
                className="text-[10px] uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity cursor-pointer border-b border-transparent hover:border-white/20 pb-1"
              >
                Begin Again
              </button>
            </div>
          </div>
        </div>
      </CinematicFade>
    </main>
  );
};

export default OutroScreen;
