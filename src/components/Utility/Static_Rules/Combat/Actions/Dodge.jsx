import React, { useState } from "react";
import "./Dodge.css";

const Dodge = () => {
  return (
    <div className="dodge-main-container">
      <h1>Dodge</h1>
      <h4>Type: Action</h4>
      <p>
        When you take the Dodge action, you focus entirely on avoiding attacks.
        Until the start of your next turn, any Attack roll made against you has
        disadvantage if you can see the attacker, and you make Dexterity Saving
        Throws with advantage. You lose this benefit if you are Incapacitated
        (as explained in Conditions ) or if your speed drops to 0.
      </p>
    </div>
  );
};

export default Dodge;
