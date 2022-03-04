import React, { useState } from "react";
import "./Ready.css";

const Ready = () => {
  return (
    <div className="ready-main-container">
      <h1>Ready</h1>
      <h4>Type: Action</h4>
      <p>
        Sometimes you want to get the jump on a foe or wait for a particular
        circumstance before you act. To do so, you can take the Ready action on
        Your Turn, which lets you act using your Reaction before the start of
        your next turn. First, you decide what perceivable circumstance will
        trigger your Reaction. Then, you choose the action you will take in
        response to that trigger, or you choose to move up to your speed in
        response to it. Examples include “If the Cultist steps on the trapdoor,
        I'll pull the lever that opens it,” and “If the Goblin steps next to me,
        I move away.”
        <br />
        <br />
        When the trigger occurs, you can either take your Reaction right after
        the trigger finishes or ignore the trigger. Remember that you can take
        only one Reaction per round.
        <br />
        <br />
        When you ready a spell, you cast it as normal but hold its energy, which
        you release with your Reaction when the trigger occurs. To be readied, a
        spell must have a Casting Time of 1 action, and holding onto the spell's
        magic requires Concentration. If your Concentration is broken, the spell
        dissipates without taking Effect. For example, if you are concentrating
        on the web spell and ready Magic Missile, your web spell ends, and if
        you take damage before you release Magic Missile with your Reaction,
        your Concentration might be broken.
      </p>
    </div>
  );
};

export default Ready;
