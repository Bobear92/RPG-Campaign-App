import React, { useState } from "react";
import "./Hide.css";

const Hide = () => {
  return (
    <div className="hide-main-container">
      <h1>Hide</h1>
      <h4>Type: Action</h4>
      <p>
        When you take the Hide action, you make a Dexterity (Stealth) check in
        an attempt to hide, following the rules for Hiding. If you succeed, you
        gain certain benefits, as described in the “Unseen Attackers and
        Targets” section.
      </p>
    </div>
  );
};

export default Hide;
