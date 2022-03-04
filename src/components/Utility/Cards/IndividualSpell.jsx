import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./IndividualSpell.css";

const IndividualSpell = ({ allMySpells, GM }) => {
  const { id } = useParams();
  const spell = allMySpells.find((element) => element.id == id);
  console.log(spell);

  const name = spell.name;
  const level = spell.level === 0 ? "Cantrip" : spell.level;
  const casting_time = spell.casting_time;
  const ritual = spell.ritual ? "This spell can be cast as a ritual" : null;
  const duration = spell.duration;
  const range = spell.range;
  const damage_type = spell.damage_type;
  const concentration = spell.concentration
    ? "This spell requires concentration"
    : null;
  const attack_type = spell.attack_type;

  let components = "";
  const componentsMap = spell.components.map((component, indx) => {
    if (indx == spell.components.length - 1) {
      components += component;
    } else {
      components += component + ",";
    }
  });
  const materials = spell.materials;
  const school = spell.school;
  const description = spell.description;
  const higher_levels = spell.higher_levels ? spell.higher_levels : null;

  let classList = "";
  const classesMap = spell.classes.map((eachClass, indx) => {
    if (indx == spell.classes.length - 1) {
      classList += eachClass;
    } else {
      classList += eachClass + ", ";
    }
  });

  let subClassList = "";
  const subClassMap = spell.subclass.map((eachSubClass, indx) => {
    if ((indx = spell.subclass.length - 1)) {
      subClassList += eachSubClass;
    } else {
      subClassList += eachSubClass + ", ";
    }
  });

  const gmNotes =
    spell.gm_notes === "no spell notes"
      ? "No Dungeon Master Notes on this spell."
      : spell.gm_notes;
  const visible = spell.visible
    ? "Players can see this spell."
    : "This spell is hidden from players.";

  return (
    <div className="individual-spell-main-container">
      <div className="individual-spell-name-container">
        <h1 className="individual-spell-name">{name}</h1>
      </div>
      <div className="individual-spell-info-container">
        <p>Level: {level}</p>
        <p>Casting Time: {casting_time}</p>
        {ritual ? <p>{ritual}</p> : null}
        <p>Duration: {duration}</p>
        {concentration ? <p>Concentration: {concentration}</p> : null}
        <p>Range: {range}</p>
        {attack_type === "no attack type" ? null : (
          <p>Attack Type: {attack_type}</p>
        )}
        {damage_type === "no damage type" ? null : (
          <p>Damage Type: {damage_type}</p>
        )}
        <p>
          Components: {components} ({materials})
        </p>
        <p>School: {school}</p>
      </div>
      <div className="individual-spell-description-container">
        <p>{description}</p>
        <p>{higher_levels ? higher_levels : null}</p>
        <p>Classes that can use this spell: {classList}</p>
        {subClassList ? (
          <p>Subclasses that can use this spell: {subClassList}</p>
        ) : null}
      </div>
      {GM ? (
        <div className="individual-spell-gm-container">
          <p>Dungeon Master Notes: {gmNotes}</p>
          <p>Visible: {visible}</p>
        </div>
      ) : null}
    </div>
  );
};

export default IndividualSpell;
