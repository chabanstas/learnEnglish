import React, { useState, useEffect } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import WordDisplay from './WordDisplay';
import NavigationButtons from './NavigationButtons';
import SearchInput from './SearchInput';

function App() {
  const [lessons, setLessons] = useState<Record<string, string[]>>({});
  const [selectedLesson, setSelectedLesson] = useState<string>('lesson1');
  const [wordIndexes, setWordIndexes] = useState<number[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [randomWordMode, setRandomWordMode] = useState<'none' | 'lesson' | 'general'>('none');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredWords, setFilteredWords] = useState<string[]>([]);


  useEffect(() => {
    fetch('/words.json')
      .then(response => response.json())
      .then(data => setLessons(data))
      .catch(error => console.error('Error fetching lessons:', error));
  }, []);

  useEffect(() => {
    // Filter words based on search query
    const filtered = getAllWords().filter(word =>
      word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWords(filtered);
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const getRandomIndexesForLesson = (lesson: string) => {
    const wordsCount = lessons[lesson]?.length || 0;
    const indexes: number[] = [];
    while (indexes.length < wordsCount) {
      const newIndex = Math.floor(Math.random() * wordsCount);
      if (!indexes.includes(newIndex)) {
        indexes.push(newIndex);
      }
    }
    return indexes;
  };

  const getRandomIndexes = () => {
    const allWords = getAllWords();
    return Array.from({ length: allWords.length }, (_, index) => index).sort(() => Math.random() - 0.5);
  };

  const getAllWords = () => {
    const allWords: string[] = [];
    Object.values(lessons).forEach(words => {
      allWords.push(...words);
    });
    return allWords;
  };

  const words = randomWordMode === 'none'
    ? lessons[selectedLesson] || []
    : randomWordMode === 'lesson'
      ? wordIndexes.map(index => lessons[selectedLesson]?.[index])
      : wordIndexes.map(index => getAllWords()[index]);

  const [english, translation] = words[wordIndex]?.split(' - ') || ['', ''];

  const handleLessonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLesson(event.target.value);
    setWordIndex(0);
    setShowTranslation(false);
    if (randomWordMode === 'lesson') {
      setWordIndexes(getRandomIndexesForLesson(event.target.value));
    }
  };

  const handleClickNext = () => {
    setShowTranslation(!showTranslation);
    if (showTranslation) {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  };

  const handleClickPrev = () => {
    setShowTranslation(true);
    setWordIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  const handleRandomWordModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMode = event.target.value as 'none' | 'lesson' | 'general';
    setRandomWordMode(selectedMode);
    if (selectedMode === 'lesson') {
      setWordIndexes(getRandomIndexesForLesson(selectedLesson));
    } else if (selectedMode === 'general') {
      setWordIndexes(getRandomIndexes());
    } else {
      setWordIndexes([]);
    }
    if (selectedMode !== 'none') {
      setWordIndex(0);
    }
    setShowTranslation(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Header content */}
        <h1>{selectedLesson}</h1>
        <Dropdown 
          selectedLesson={selectedLesson}
          handleLessonChange={handleLessonChange}
          randomWordMode={randomWordMode}
          handleRandomWordModeChange={handleRandomWordModeChange}
          lessons={lessons}
        />
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </header>
      <main className="App-body">
        {/* Body content */}
        <WordDisplay 
          english={english}
          translation={translation}
          showTranslation={showTranslation}
        />
        <NavigationButtons 
          handleClickPrev={handleClickPrev}
          handleClickNext={handleClickNext}
        />
      </main>
      <footer className="App-footer">
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;
