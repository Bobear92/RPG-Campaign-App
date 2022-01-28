import React, { useState, useEffect, Fragment } from "react";
import "./SpellInit.css";
import { createSpell } from "../../api/spells";

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

            const name = spell.name;
            const level = spell.level;
            const school = spell.school.name;
            const attackType =
              !spell.damage || !spell.damage.damage_type
                ? "no damage type"
                : spell.damage.damage_type.name;
            const castingTime = spell.casting_time;
            const range = spell.range;
            const concentration = spell.concentration;
            const components = spell.components;
            const materials = spell.material;
            const duration = spell.duration;
            const ritual = spell.ritual;
            const description = spell.desc;
            const higherLevel = spell.higher_level;

            return createSpell(
              name,
              level,
              school,
              attackType,
              castingTime,
              range,
              concentration,
              components,
              materials,
              duration,
              ritual,
              classArray,
              subClassArray,
              description,
              higherLevel,
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
