import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CinematicFadeProps {
  children: React.ReactNode;
  keyId: string;
}

const CinematicFade: React.FC<CinematicFadeProps> = ({ children, keyId }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyId}
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="absolute inset-0 flex flex-col hide-scrollbar"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default CinematicFade;
