import React, { useState, Fragment } from "react";
import { SpellCard } from "../Utility";

const AllSpellsList = ({ allMySpells }) => {
  console.log(allMySpells);
  return (
    <div>
      {allMySpells && allMySpells.length
        ? allMySpells.map((spell, idx) => {
            return (
              <Fragment key={`Spell in main spell list ${spell.name} ${idx}`}>
                <SpellCard spell={spell} />
              </Fragment>
            );
          })
        : null}
    </div>
  );
};

export default AllSpellsList;

// Below is everything needed to display a spell

// above return

// const [arrow, setArrow] = useState([]);
//   const [name, setName] = useState("");
//   const [level, setLevel] = useState(0);
//   const [school, setSchool] = useState("");
//   const [castingTime, setCastingTime] = useState("");
//   const [range, setRange] = useState("");
//   const [components, setComponents] = useState([]);
//   const [materials, setMaterials] = useState("");
//   const [duration, setDuration] = useState("");
//   const [ritual, setRitual] = useState(false);
//   const [concentration, setConcentration] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [subClass, setSubClass] = useState([]);
//   const [description, setDescription] = useState("");
//   const [higherLevels, setHigherLevels] = useState("");
//   const [attackType, setAttackType] = useState("");
//   const [damageType, setDamageType] = useState("");

//   const handleSpell = async () => {
//     const spell = await acidArrow();
//     setArrow(spell);
//     setName(spell.name);
//     setLevel(spell.level);
//     setSchool(spell.school.name);
//     setCastingTime(spell.casting_time);
//     setRange(spell.range);
//     setConcentration(spell.concentration);
//     setComponents(spell.components);
//     setMaterials(spell.material);
//     setDuration(spell.duration);
//     setRitual(spell.ritual);
//     setDescription(spell.desc);
//     setHigherLevels(spell.higher_level);
//     setDamageType(spell.damage.damage_type.name);

//     function capitalize(string) {
//       return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     setAttackType(capitalize(spell.attack_type));
//   };

//   const classSorting = async () => {
//     const spell = await acidArrow();
//     const subClassArray = [];
//     spell.subclasses.map((eachSubClass) => {
//       subClassArray.push(eachSubClass.name);
//     });
//     setSubClass(subClassArray);

//     const classArray = [];
//     spell.classes.map((eachClass) => {
//       classArray.push(eachClass.name);
//     });
//     setClasses(classArray);
//   };

//   useEffect(() => {
//     async function innerFunc() {
//       await handleSpell();
//       await classSorting();
//     }
//     innerFunc();
//   }, []);

// in the return

{
  /* <div>
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
        Components:{" "}
        {components.map((component, index) => {
          return (
            <span key={index + component}>
              {component} {index < component.length + 1 ? " , " : ""}
            </span>
          );
        })}
        ({materials})
      </h3>
      <h3>Duration: {duration}</h3>
      <h3>Ritual: {ritual ? "Yes" : "No"}</h3>
      <h3>Classes: {classes}</h3>
      <h3>
        SubClasses:{" "}
        {subClass.map((individualSubClass, index) => {
          return (
            <span key={individualSubClass + index}>
              {individualSubClass}
              {index < individualSubClass.length - 1 ? " " : ""}
            </span>
          );
        })}
      </h3>
      <div>
        <h4>Spell Description</h4>
        <p>{description}</p>
      </div>
      <div>
        <h4>At Higher Levels</h4>
        <p>{higherLevels}</p>
      </div>
    </div>  */
}
