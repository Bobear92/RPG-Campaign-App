import React, { useState } from "react";
import "./Attack.css";

const Attack = () => {
  return (
    <div className="attack-main-container">
      <h1>Attack</h1>
      <h4>Type: Action</h4>
      <p>
        The most Common action to take in combat is the Attack action, whether
        you are swinging a sword, firing an arrow from a bow, or brawling with
        your fists. With this action, you make one melee or ranged Attack. See
        the “Making an Attack” section for the rules that govern attacks.
        <br />
        <br />
        Certain features, such as the Extra Attack feature of the Fighter, allow
        you to make more than one Attack with this action.
      </p>
    </div>
  );
};

export default Attack;
