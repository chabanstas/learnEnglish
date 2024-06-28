// Dropdown.tsx
import React from 'react';

interface DropdownProps {
  selectedLesson: string;
  handleLessonChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  randomWordMode: 'none' | 'lesson' | 'general';
  handleRandomWordModeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  lessons: { [key: string]: string[] };
}

const Dropdown: React.FC<DropdownProps> = ({ selectedLesson, handleLessonChange, randomWordMode, handleRandomWordModeChange, lessons }) => (
  <div className="dropdown-container">
    <label htmlFor="lesson-select">Choose a lesson: </label>
    <select id="lesson-select" value={selectedLesson} onChange={handleLessonChange} disabled={randomWordMode === 'general'}>
      {Object.keys(lessons).map((lesson) => (
        <option key={lesson} value={lesson}>{lesson}</option>
      ))}
    </select>
    <div className="random-word-mode-container">
      <label htmlFor="random-word-mode">Random Word Mode:</label>
      <select id="random-word-mode" value={randomWordMode} onChange={handleRandomWordModeChange}>
        <option value="none">Disabled</option>
        <option value="lesson">Random Word from Lesson</option>
        <option value="general">General Random Word</option>
      </select>
    </div>
  </div>
);

export default Dropdown;
