import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './PageLogic';
import Home from './pages/Home';
import LearnModels from './pages/LearnModels';
import './App.css';
import LearnWords from './pages/LearnWords';

const App: React.FC = () => {

  return (
    <Router>
      <Header/>
      <main className="App-body">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/words" element={<LearnWords/>} />
              <Route path="/models" element={<LearnModels />} />
          </Routes>
      </main>
    </Router>
  );
}

export default App;
