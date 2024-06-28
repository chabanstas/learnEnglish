// WordDisplay.tsx
import React from 'react';

interface WordDisplayProps {
  english: string;
  translation: string;
  showTranslation: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ english, translation, showTranslation }) => (
  <p>{showTranslation ? `${english} - ${translation}` : english}</p>
);

export default WordDisplay;
