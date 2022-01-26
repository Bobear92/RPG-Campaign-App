import React, { useState, useEffect } from "react";

const SpellInitButton = () => {
  const [arrow, setArrow] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [school, setSchool] = useState("");
  const [castingTime, setCastingTime] = useState("");
  const [range, setRange] = useState("");
  const [components, setComponents] = useState([]);
  const [materials, setMaterials] = useState("");
  const [duration, setDuration] = useState("");
  const [ritual, setRitual] = useState(false);
  const [concentration, setConcentration] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subClass, setSubClass] = useState([]);
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
  return (
    <div>
      <button>Populate initial spell data</button>
    </div>
  );
};

export default SpellInitButton;
