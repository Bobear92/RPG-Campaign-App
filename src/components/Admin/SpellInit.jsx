import React, { useState, useEffect } from "react";
import { acidArrow } from "../../api";

const SpellInit = () => {
  const [arrow, setArrow] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [school, setSchool] = useState("");
  const [castingTime, setCastingTime] = useState("");
  const [range, setRange] = useState("");
  const [components, setComponents] = useState([]); // this one i need to map and splice commas into
  const [materials, setMaterials] = useState("");
  const [duration, setDuration] = useState("");
  const [ritual, setRitual] = useState(false);
  const [concentration, setConcentration] = useState(false);
  const [classes, setClasses] = useState([]); // this one i need to map and splice commas into
  const [subClass, setSubClass] = useState([]); // this one i need to map and splice commas into
  const [description, setDescription] = useState("");
  const [higherLevels, setHigherLevels] = useState("");
  const [attackType, setAttackType] = useState("");
  const [damageType, setDamageType] = useState("");

  const handleSpell = async () => {
    const spell = await acidArrow();
    setArrow(spell);
    setName(spell.name);
    setLevel(spell.level);
    setSchool(spell.school.name);
    setCastingTime(spell.casting_time);
    setRange(spell.range);
    setConcentration(spell.concentration);
    setComponents(spell.components);
    setMaterials(spell.material);
    setDuration(spell.duration);
    setRitual(spell.ritual);
    setDescription(spell.desc);
    setHigherLevels(spell.higher_level);
    setDamageType(spell.damage.damage_type.name);

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setAttackType(capitalize(spell.attack_type));
  };

  const classSorting = async () => {
    const spell = await acidArrow();
    const subClassArray = [];
    spell.subclasses.map((eachSubClass) => {
      subClassArray.push(eachSubClass.name);
    });
    setSubClass(subClassArray);

    const classArray = [];
    spell.classes.map((eachClass) => {
      classArray.push(eachClass.name);
    });
    setClasses(classArray);
  };

  useEffect(() => {
    async function innerFunc() {
      await handleSpell();
      await classSorting();
    }
    innerFunc();
  }, []);

  console.log(arrow);

  return (
    <div>
      <h2>{name}</h2>
      <h3>
        Level: {level} {school}
      </h3>
      <h3>Attack Type: {attackType}</h3>
      <h3>Damage Type: {damageType}</h3>
      <h3>Casting Time: {castingTime}</h3>
      <h3>Range: {range}</h3>
      <h3>Concentration: {concentration ? "Yes" : "No"}</h3>
      <h3>
        Components: {components} ({materials})
      </h3>
      <h3>Duration: {duration}</h3>
      <h3>Ritual: {ritual ? "Yes" : "No"}</h3>
      <h3>Classes: {classes}</h3>
      <h3>SubClasses: {subClass}</h3>
      <div>
        <h4>Spell Description</h4>
        <p>{description}</p>
      </div>
      <div>
        <h4>At Higher Levels</h4>
        <p>{higherLevels}</p>
      </div>
    </div>
  );
};

export default SpellInit;
