export interface PhaseData {
  id: string;
  number: string;
  title: string;
  promptA: string;
  promptB: string | ((aAnswer: string) => string);
}

export type TurnState = 'intro' | 'inputA' | 'passToB' | 'inputB' | 'passToReveal' | 'reveal';

export interface PhaseAnswers {
  A: string;
  B: string;
}

export interface PlayerNames {
  A: string;
  B: string;
}

export type AppState = 'intro' | 'landing' | 'playing' | 'outro';
