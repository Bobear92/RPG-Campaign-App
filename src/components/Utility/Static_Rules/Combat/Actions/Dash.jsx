import React, { useState } from "react";
import "./Dash.css";

const Dash = () => {
  return (
    <div className="dash-main-container">
      <h1>Dash</h1>
      <h4>Type: Action</h4>
      <p>
        When you take the Dash action, you gain extra movement for the current
        turn. The increase equals your speed, after applying any modifiers. With
        a speed of 30 feet, for example, you can move up to 60 feet on your turn
        if you dash. Any increase or decrease to your speed changes this
        additional movement by the same amount. If your speed of 30 feet is
        reduced to 15 feet, for instance, you can move up to 30 feet this turn
        if you dash.
      </p>
    </div>
  );
};

export default Dash;
