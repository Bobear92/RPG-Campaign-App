import React, { useState } from "react";
import "./SpellCard.css";

const SpellCard = ({ spell }) => {
  // console.log(spell);

  const name = !spell.name ? "This spell's name is unknown" : spell.name;

  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
};

export default SpellCard;
