import React, { useState, useEffect, Fragment } from "react";
import "./SpellInit.css";
import { createSpell } from "../../api/spells";
import { SpellInitButton } from ".";

const SpellInit = ({ spellDescriptions }) => {
  // console.log(spellDescriptions); this is still working
  const createSpellTable = async () => {
    return await Promise.all(
      spellDescriptions && spellDescriptions.length
        ? spellDescriptions.map((spell, idx) => {
            const classArray = [];
            spell.classes.map((eachClass) => {
              classArray.push(eachClass.name);
            });

            const subClassArray = [];
            spell.subclasses.map((eachSubClass) => {
              subClassArray.push(eachSubClass.name);
            });

            return createSpell(
              spell.name,
              spell.level,
              spell.school.name,
              spell.attack_type,
              !spell.damage || !spell.damage.damage_type
                ? "no damage type"
                : spell.damage.damage_type.name,
              spell.casting_time,
              spell.range,
              spell.concentration,
              spell.components,
              spell.material,
              spell.duration,
              spell.ritual,
              classArray,
              subClassArray,
              spell.desc,
              spell.higher_level,
              true
            );
          })
        : null
    );
  };
  return (
    <div>
      <h1>
        This is where the spell table will be filled with the outside api.
      </h1>
      <button onClick={createSpellTable}>Populate initial spell data</button>
    </div>
  );
};

export default SpellInit;

// key={`Spell in main spell list ${spell.name} ${idx}`}
