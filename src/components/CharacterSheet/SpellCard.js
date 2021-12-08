import React, { useState } from "react";
import "./SpellCard.css";

const SpellCard = ({ spell }) => {
  console.log(spell);
  return (
    <div>
      <h3>{spell.name}</h3>
    </div>
  );
};

export default SpellCard;
