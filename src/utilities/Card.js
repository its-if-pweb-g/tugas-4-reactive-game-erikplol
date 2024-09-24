import React from "react";
import "./Card.css";

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div className="card" onClick={onClick}>
      {isFlipped ? (
        <img src={card.imgSrc} alt={card.name} />
      ) : (
        <div className="card-back">?</div>
      )}
      <p>{isFlipped}</p>
    </div>
  );
};

export default Card;
