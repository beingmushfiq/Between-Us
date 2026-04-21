import { PhaseData } from '../types';

export const PHASES: PhaseData[] = [
  {
    id: 'invisible-rules',
    number: 'Phase I',
    title: 'Invisible Rules',
    promptA: 'Name an invisible rule we follow in our relationship without ever speaking about it.',
    promptB: 'Name an invisible rule we follow in our relationship without ever speaking about it.',
  },
  {
    id: 'unasked-question',
    number: 'Phase II',
    title: 'The Unasked Question',
    promptA: 'Write a question you have always wanted to ask the other person, but haven’t.',
    promptB: (aAnswer: string) => `The other person asked you:\n\n"${aAnswer}"\n\nHow do you answer?`,
  },
  {
    id: 'rewind-point',
    number: 'Phase III',
    title: 'Rewind Point',
    promptA: 'If you could rewind to one specific moment between us to feel it again, which would it be?',
    promptB: 'If you could rewind to one specific moment between us to feel it again, which would it be?',
  },
  {
    id: 'life-trade',
    number: 'Phase IV',
    title: 'Life Trade',
    promptA: 'Would you trade places with me for 24 hours if it meant feeling everything I feel? Why?',
    promptB: 'Would you trade places with me for 24 hours if it meant feeling everything I feel? Why?',
  },
  {
    id: 'future-memory',
    number: 'Phase V',
    title: 'Future Memory',
    promptA: 'Write a memory of us that hasn’t happened yet.',
    promptB: 'Write a memory of us that hasn’t happened yet.',
  },
];
