import React, { useState } from "react";
import "./Cast_a_Spell.css";

const Cast_a_Spell = () => {
  return (
    <div className="cast-a-spell-main-container">
      <h1>Cast a Spell</h1>
      <h4>Type: Action</h4>
      <p>
        Spellcasters such as wizards and clerics, as well as many Monsters, have
        access to Spells and can use them to great Effect in combat. Each spell
        has a Casting Time, which specifies whether the caster must use an
        action, a Reaction, minutes, or even hours to cast the spell. Casting a
        Spell is, therefore, not necessarily an action. Most Spells do have a
        Casting Time of 1 action, so a Spellcaster often uses his or her action
        in combat to cast such a spell.
      </p>
    </div>
  );
};

export default Cast_a_Spell;
