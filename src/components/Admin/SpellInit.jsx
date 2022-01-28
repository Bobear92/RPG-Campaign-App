import React, { useState, useEffect, Fragment } from "react";
import "./SpellInit.css";
import { createSpell } from "../../api/spells";

const SpellInit = ({ spellDescriptions }) => {
  // console log below is working
  // console.log(spellDescriptions);
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

            const name = !spell.name ? "no name" : spell.name;
            const level = !spell.level ? 0 : spell.level;
            const school = !spell.school.name ? "no school" : spell.school.name;
            const attackType = !spell.attack_type
              ? "no attack type"
              : spell.attack_type;
            const damageType =
              !spell.damage || !spell.damage.damage_type
                ? "no damage type"
                : spell.damage.damage_type.name;
            const castingTime = !spell.casting_time
              ? "no casting time"
              : spell.casting_time;
            const range = !spell.range ? "no range" : spell.range;
            const concentration = !spell.concentration
              ? false
              : spell.concentration;
            const components = !spell.components ? [] : spell.components;
            const materials = !spell.material ? "no materials" : spell.material;
            const duration = !spell.duration ? "no duration" : spell.duration;
            const ritual = !spell.ritual ? false : spell.ritual;
            const description = !spell.desc ? ["no description"] : spell.desc;
            const higherLevels = !spell.higher_level ? [] : spell.higher_level;

            // console.log(higherLevels, "description");

            return createSpell(
              name,
              level,
              school,
              attackType,
              damageType,
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
              higherLevels,
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
