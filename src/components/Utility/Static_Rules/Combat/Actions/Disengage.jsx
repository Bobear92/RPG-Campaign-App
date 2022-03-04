import React, { useState } from "react";
import "./Disengage.css";

const Disengage = () => {
  return (
    <div className="disengage-main-container">
      <h1>Disengage</h1>
      <h4>Type: Action</h4>
      <p>
        If you take the Disengage action, your Movement doesn't provoke
        Opportunity Attacks for the rest of the turn.
      </p>
    </div>
  );
};

export default Disengage;
