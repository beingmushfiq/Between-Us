import React, { useState, useCallback, useMemo, useEffect } from 'react';
import AtmosphericBackground from './components/AtmosphericBackground';
import LandingScreen from './components/LandingScreen';
import OutroScreen from './components/OutroScreen';
import PhaseIntroScreen from './components/PhaseIntroScreen';
import InputScreen from './components/InputScreen';
import PassScreen from './components/PassScreen';
import RevealScreen from './components/RevealScreen';
import StartupIntro from './components/StartupIntro';
import { PHASES } from './data/phases';
import { AppState, TurnState, PhaseAnswers, PlayerNames } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [playerNames, setPlayerNames] = useState<PlayerNames>({ A: '', B: '' });
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [turnState, setTurnState] = useState<TurnState>('intro');
  const [allAnswers, setAllAnswers] = useState<Record<string, PhaseAnswers>>({});
  
  // Current phase tracking
  const currentPhase = useMemo(() => PHASES[phaseIndex], [phaseIndex]);
  const currentAnswers = useMemo(() => 
    allAnswers[currentPhase?.id] || { A: '', B: '' }, 
    [allAnswers, currentPhase]
  );

  const handleUpdateAnswer = useCallback((actor: 'A' | 'B', text: string) => {
    setAllAnswers(prev => ({
      ...prev,
      [currentPhase.id]: {
        ...(prev[currentPhase.id] || { A: '', B: '' }),
        [actor]: text,
      }
    }));
  }, [currentPhase?.id]);

  const advancePhase = useCallback(() => {
    if (phaseIndex < PHASES.length - 1) {
      setPhaseIndex(i => i + 1);
      setTurnState('intro');
    } else {
      setAppState('outro');
    }
  }, [phaseIndex]);

  const handleBegin = useCallback((names: PlayerNames) => {
    setPlayerNames(names);
    setAppState('playing');
  }, []);

  // --- RENDERERS ---

  if (appState === 'intro') {
    return <StartupIntro onComplete={() => setAppState('landing')} />;
  }

  if (appState === 'landing') {
    return <LandingScreen onBegin={handleBegin} />;
  }

  if (appState === 'outro') {
    return <OutroScreen phases={PHASES} allAnswers={allAnswers} playerNames={playerNames} />;
  }

  // --- PLAYING STATE RENDERERS ---

  return (
    <main className="relative h-[100dvh] w-full font-sans selection:bg-white/10 overflow-hidden z-10 bg-[#06080a]">
      <AtmosphericBackground />
      
      {turnState === 'intro' && (
        <PhaseIntroScreen 
          number={currentPhase.number} 
          title={currentPhase.title} 
          onReady={() => setTurnState('inputA')} 
          index={phaseIndex}
        />
      )}

      {turnState === 'inputA' && (
        <InputScreen
          actorName={playerNames.A}
          prompt={currentPhase.promptA}
          value={currentAnswers.A}
          onChange={(val) => handleUpdateAnswer('A', val)}
          onContinue={() => setTurnState('passToB')}
        />
      )}

      {turnState === 'passToB' && (
        <PassScreen
          message={`Pass the device to ${playerNames.B}`}
          subtext="Don't look."
          onReady={() => setTurnState('inputB')}
        />
      )}

      {turnState === 'inputB' && (
        <InputScreen
          actorName={playerNames.B}
          prompt={typeof currentPhase.promptB === 'function' ? currentPhase.promptB(currentAnswers.A) : currentPhase.promptB}
          value={currentAnswers.B}
          onChange={(val) => handleUpdateAnswer('B', val)}
          onContinue={() => setTurnState('passToReveal')}
        />
      )}

      {turnState === 'passToReveal' && (
        <PassScreen
          message="Place the device between you"
          subtext="Tap when you are both ready."
          onReady={() => setTurnState('reveal')}
        />
      )}

      {turnState === 'reveal' && (
        <RevealScreen
          title={currentPhase.title}
          promptA={currentPhase.promptA}
          answerA={currentAnswers.A}
          answerB={currentAnswers.B}
          playerNameA={playerNames.A}
          playerNameB={playerNames.B}
          onNext={advancePhase}
          isFinal={phaseIndex === PHASES.length - 1}
        />
      )}
    </main>
  );
}
