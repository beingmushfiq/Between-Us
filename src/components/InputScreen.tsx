import React from 'react';
import CinematicFade from './CinematicFade';
import SoftButton from './SoftButton';

interface InputScreenProps {
  actorName: string;
  prompt: string;
  value: string;
  onChange: (val: string) => void;
  onContinue: () => void;
}

const InputScreen: React.FC<InputScreenProps> = ({
  actorName,
  prompt,
  value,
  onChange,
  onContinue,
}) => {
  return (
    <CinematicFade keyId={prompt.substring(0, 10)}>
      <div className="flex flex-col h-full max-w-2xl mx-auto w-full px-6 py-6 md:py-12 z-10 relative">
        <header className="flex justify-between items-center text-[10px] sm:text-[11px] uppercase tracking-[0.3em] opacity-50">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-white opacity-40" />
            {actorName}'s turn
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" aria-hidden="true" />
            Private Entry
          </span>
        </header>

        <div className="flex-1 flex flex-col mt-12 md:mt-24 space-y-12 overflow-hidden">
          <h2 className="font-serif text-2xl md:text-4xl leading-tight text-white italic whitespace-pre-wrap">
            {prompt}
          </h2>
          
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 w-full bg-transparent border-none outline-none resize-none hide-scrollbar font-serif text-lg md:text-xl text-white/80 placeholder:text-white/20 leading-relaxed italic focus:ring-0"
            autoFocus
            aria-label="Your answer"
          />
        </div>

        <div className="pb-8 pt-8 flex justify-end shrink-0">
          <SoftButton onClick={onContinue} disabled={value.trim().length === 0}>
            Continue
          </SoftButton>
        </div>
      </div>
    </CinematicFade>
  );
};

export default InputScreen;
