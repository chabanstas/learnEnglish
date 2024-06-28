// NavigationButtons.tsx
import React from 'react';

interface NavigationButtonsProps {
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ handleClickPrev, handleClickNext }) => (
  <div className="button-container">
    <button onClick={handleClickPrev}>← Previous</button>
    <button onClick={handleClickNext}>Next →</button>
  </div>
);

export default NavigationButtons;
