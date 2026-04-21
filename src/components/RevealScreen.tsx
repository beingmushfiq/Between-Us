import React from 'react';
import { motion } from 'motion/react';
import CinematicFade from './CinematicFade';
import SoftButton from './SoftButton';

interface RevealScreenProps {
  title: string;
  promptA: string;
  answerA: string;
  answerB: string;
  playerNameA: string;
  playerNameB: string;
  onNext: () => void;
  isFinal: boolean;
}

const RevealScreen: React.FC<RevealScreenProps> = ({
  title,
  promptA,
  answerA,
  answerB,
  playerNameA,
  playerNameB,
  onNext,
  isFinal,
}) => {
  return (
    <CinematicFade keyId={`reveal-${title}`}>
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-6 py-12 md:py-20 overflow-y-auto hide-scrollbar z-10 items-center justify-between">
        <header className="w-full flex justify-between items-start mb-12 shrink-0">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold">{title}</span>
            <h2 className="text-sm font-light italic tracking-tight font-serif">The Reveal</h2>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true"></div>
            <span className="text-[10px] sm:text-[11px] tracking-widest uppercase">Shared Reveal</span>
          </div>
        </header>

        <main className="w-full flex-1 flex flex-col justify-center items-center gap-12 sm:gap-16">
          <div className="text-center space-y-4">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] opacity-40">The Prompt</p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif italic text-white max-w-2xl leading-tight">
              "{promptA}"
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Player A's Answer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-3xl group-hover:bg-white/10 transition-all focus-within:bg-white/10"></div>
              <div className="relative bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl min-h-[220px] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">{playerNameA}:</span>
                  <p className="text-lg sm:text-xl font-light leading-relaxed text-white/90 italic">
                    {answerA}
                  </p>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6"></div>
              </div>
            </motion.div>

            {/* Player B's Answer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/5 blur-xl rounded-3xl group-hover:bg-white/10 transition-all focus-within:bg-white/10"></div>
              <div className="relative bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl min-h-[220px] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">{playerNameB}:</span>
                  <p className="text-lg sm:text-xl font-light leading-relaxed text-white/90 italic">
                    {answerB}
                  </p>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6"></div>
              </div>
            </motion.div>
          </div>
        </main>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 2 }}
          className="mt-16 w-full flex flex-col items-center gap-6 shrink-0"
        >
          <div className="flex items-center gap-4 text-white/30">
            <div className="h-[1px] w-12 bg-current" aria-hidden="true"></div>
            <p className="text-[11px] uppercase tracking-[0.2em]">Breathe this moment in</p>
            <div className="h-[1px] w-12 bg-current" aria-hidden="true"></div>
          </div>
          
          <SoftButton onClick={onNext}>{isFinal ? 'See The Thread' : 'Next Phase'}</SoftButton>
        </motion.div>
      </div>
    </CinematicFade>
  );
};

export default RevealScreen;
