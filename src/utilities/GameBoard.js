import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import "./GameBoard.css";

// Daftar kartu
const cardList = [
  { id: 1, name: "Card 1", imgSrc: "/assets/img/1.jpg" },
  { id: 2, name: "Card 2", imgSrc: "/assets/img/2.jpeg" },
  { id: 3, name: "Card 3", imgSrc: "/assets/img/3.jpg" },
  { id: 4, name: "Card 4", imgSrc: "/assets/img/4.jpg" },
  { id: 5, name: "Card 5", imgSrc: "/assets/img/5.jpg" },
  { id: 6, name: "Card 6", imgSrc: "/assets/img/6.png" },
];

// Fungsi untuk menggandakan dan mengacak kartu
const duplicateAndShuffleCards = (cards) => {
  const duplicatedCards = cards.flatMap((card) => [
    { ...card, id: `${card.id}-a` },
    { ...card, id: `${card.id}-b` },
  ]);
  return duplicatedCards.sort(() => Math.random() - 0.5);
};

const GameBoard = ({ updateScore, updateLastScore }) => {
  const [cards, setCards] = useState(duplicateAndShuffleCards(cardList));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);

  const handleCardClick = (card) => {
    if (
      !gameStarted ||
      selectedCards.length === 2 ||
      matchedCards.includes(card.id)
    ) {
      return;
    }

    setSelectedCards((prev) => [...prev, card]);

    if (selectedCards.length === 1) {
      const [firstCard] = selectedCards;

      if (firstCard.name === card.name) {
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
        const newScore = score + 10;
        setScore(newScore);
        updateScore(newScore);
      } else {
        const newScore = score - 5;
        setScore(newScore);
        updateScore(newScore);
      }

      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
  };

  const resetGame = useCallback(() => {
    updateLastScore(score);
    setScore(0);
    updateScore(0);
    setMatchedCards([]);
    setSelectedCards([]);
    setCards(duplicateAndShuffleCards(cardList));
    setShowAllCards(false);
    setGameStarted(false);
  }, [score, updateLastScore, updateScore]);

  const handleStartGame = () => {
    setGameStarted(true);
    setShowAllCards(true);

    setTimeout(() => {
      setShowAllCards(false);
    }, 2000);
  };

  useEffect(() => {
    if (matchedCards.length === cards.length && matchedCards.length > 0) {
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  }, [matchedCards, cards.length, resetGame]);

  return (
    <div className="game-board-container">
      {gameStarted && (
        <div className="card-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              isFlipped={
                showAllCards ||
                selectedCards.includes(card) ||
                matchedCards.includes(card.id)
              }
            />
          ))}
        </div>
      )}
      <div className="button-container">
        {!gameStarted ? (
          <button onClick={handleStartGame}>Start Game</button>
        ) : (
          <button onClick={resetGame}>Reset Game</button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
