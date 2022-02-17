import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MonsterCard.css";

const MonsterCard = ({ monster }) => {
  const name = monster.name;
  const rating = monster.challenge_rating;
  const size = monster.size;
  const type = monster.type;

  return (
    <div className="main-monster-card-container">
      <div className="monster-card-info-container">
        <Link to={`/individual-monster/${monster.id}`}>
          <h4 className="monster-card-item-name">{name}</h4>
        </Link>
        <h4 className="monster-card-item-type">{type}</h4>
        <h4 className="monster-card-item-rating">CR: {rating}</h4>
        <h4 className="monster-card-item-size">{size}</h4>
      </div>
    </div>
  );
};

export default MonsterCard;
