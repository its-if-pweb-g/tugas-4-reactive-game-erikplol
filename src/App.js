import React, { useState } from "react";
import GameBoard from "./utilities/GameBoard";
import Header from "./utilities/Header";
import './App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lastScore, setLastScore] = useState(null);

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  const handleLastScoreUpdate = (newLastScore) => {
    setLastScore(newLastScore);
  };

  return (
    <div className="App">
      <Header score={score} bestScore={bestScore} lastScore={lastScore} />
      <div className="game-area">
        <GameBoard updateScore={handleScoreUpdate} updateLastScore={handleLastScoreUpdate} />
      </div>
    </div>
  );
};

export default App;
