import React from "react";

const Header = ({ score, bestScore, lastScore }) => {
  return (
    <div className="header">
      <h1>Memory Kak Gem (Card Game)</h1>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <p>Last Score: {lastScore}</p>
    </div>
  );
};

export default Header;
