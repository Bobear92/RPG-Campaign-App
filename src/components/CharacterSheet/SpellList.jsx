import React, { useEffect, useState } from "react";
import { acidArrow } from "../../api";

const SpellList = () => {
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
  const [classes, setClasses] = useState([]); // need to map through to get the info
  const [subClass, setSubClass] = useState([]); // need to loop through to get the info
  const [description, setDescription] = useState("");
  const [higherLevels, setHigherLevels] = useState("");
  const [attackType, setAttackType] = useState("");

  const handleSpell = async () => {
    const spell = await acidArrow();
    setArrow(spell);
    setName(spell.name);
    setLevel(spell.level);
    setSchool(spell.school.name);
    setCastingTime(spell.casting_time);
    setRange(spell.range);
    setComponents(spell.components);
    setMaterials(spell.material);
    setDuration(spell.duration);
    setRitual(spell.ritual);
    setClasses(spell.classes);
    setDescription(spell.desc);
    setHigherLevels(spell.higher_level);
    setAttackType(spell.attack_type);
    setSubClass(spell.subclasses);
  };

  useEffect(() => {
    handleSpell();
  }, []);

  console.log(arrow);
  // console.log(subClass);
  return (
    <div>
      <h2>{name}</h2>
      <h3>
        Level: {level} {school}
      </h3>
      <h3>Casting Time: {castingTime}</h3>
      <h3>Range: {range}</h3>
      <h3>
        Components: {components} ({materials})
      </h3>
      <h3>Duration: {duration}</h3>
      <h3>Ritual: {ritual === false ? "No" : "Yes"}</h3>
      <h3>Classes:</h3>
      <h3>SubClasses: </h3>
      <p>{description}</p>
      <div>
        <h4>At Higher Levels</h4>
        <p>{higherLevels}</p>
      </div>
    </div>
  );
};

export default SpellList;
