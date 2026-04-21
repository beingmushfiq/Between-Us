import React, { useState, useCallback, useMemo, useEffect } from 'react';
import AtmosphericBackground from './components/AtmosphericBackground';
import LandingScreen from './components/LandingScreen';
import OutroScreen from './components/OutroScreen';
import PhaseIntroScreen from './components/PhaseIntroScreen';
import InputScreen from './components/InputScreen';
import PassScreen from './components/PassScreen';
import RevealScreen from './components/RevealScreen';
import StartupIntro from './components/StartupIntro';
import { QUESTION_POOL } from './data/questions';
import { AppState, TurnState, PhaseAnswers, PlayerNames, PhaseData } from './types';

// Helper to get random item from array
const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generate session questions
const generateSessionPhases = (): PhaseData[] => {
  const p1 = pickRandom(QUESTION_POOL.phase1);
  const p2 = pickRandom(QUESTION_POOL.phase2);
  const p3 = pickRandom(QUESTION_POOL.phase3);
  const p4 = pickRandom(QUESTION_POOL.phase4);
  const p5 = pickRandom(QUESTION_POOL.phase5);

  return [
    { id: 'p1', number: 'Phase I', title: p1.title, promptA: p1.prompt, promptB: p1.prompt },
    { 
      id: 'p2', 
      number: 'Phase II', 
      title: p2.title, 
      promptA: p2.prompt, 
      promptB: (aAnswer: string) => `They said:\n\n"${aAnswer}"\n\nWhat is your response?` 
    },
    { id: 'p3', number: 'Phase III', title: p3.title, promptA: p3.prompt, promptB: p3.prompt },
    { id: 'p4', number: 'Phase IV', title: p4.title, promptA: p4.prompt, promptB: p4.prompt },
    { id: 'p5', number: 'Phase V', title: p5.title, promptA: p5.prompt, promptB: p5.prompt },
  ];
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('intro');
  const [playerNames, setPlayerNames] = useState<PlayerNames>({ A: '', B: '' });
  
  // Use session phases
  const [sessionPhases, setSessionPhases] = useState<PhaseData[]>(() => generateSessionPhases());
  
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [turnState, setTurnState] = useState<TurnState>('intro');
  const [allAnswers, setAllAnswers] = useState<Record<string, PhaseAnswers>>({});
  
  // Current phase tracking
  const currentPhase = useMemo(() => sessionPhases[phaseIndex], [phaseIndex, sessionPhases]);
  const currentAnswers = useMemo(() => 
    (currentPhase && allAnswers[currentPhase.id]) || { A: '', B: '' }, 
    [allAnswers, currentPhase]
  );

  const handleUpdateAnswer = useCallback((actor: 'A' | 'B', text: string) => {
    if (!currentPhase) return;
    setAllAnswers(prev => ({
      ...prev,
      [currentPhase.id]: {
        ...(prev[currentPhase.id] || { A: '', B: '' }),
        [actor]: text,
      }
    }));
  }, [currentPhase?.id]);

  const advancePhase = useCallback(() => {
    if (phaseIndex < sessionPhases.length - 1) {
      setPhaseIndex(i => i + 1);
      setTurnState('intro');
    } else {
      setAppState('outro');
    }
  }, [phaseIndex, sessionPhases.length]);

  const handleBegin = useCallback((names: PlayerNames) => {
    setPlayerNames(names);
    // REALLY randomize on every click
    setSessionPhases(generateSessionPhases());
    setPhaseIndex(0);
    setAllAnswers({});
    setTurnState('intro');
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
    return <OutroScreen phases={sessionPhases} allAnswers={allAnswers} playerNames={playerNames} />;
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
          isFinal={phaseIndex === sessionPhases.length - 1}
        />
      )}
    </main>
  );
}
