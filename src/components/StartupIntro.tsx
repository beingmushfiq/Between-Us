import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StartupIntroProps {
  onComplete: () => void;
}

const StartupIntro: React.FC<StartupIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 5500),
      setTimeout(() => onComplete(), 7500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#06080a] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-center"
          >
            <p className="text-[10px] tracking-[0.8em] uppercase opacity-40 font-light text-white">
              A Moment of Stillness
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="text-center px-6"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-white italic font-light leading-relaxed">
              "Connection is not just feeling for each other,<br />it's looking in the same direction."
            </h2>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-normal text-white italic tracking-tighter">
              Between Us
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background pulse */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none"
      />
    </div>
  );
};

export default StartupIntro;
