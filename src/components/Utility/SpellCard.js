import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SpellCard.css";

const SpellCard = ({ spell }) => {
  // console.log(spell);

  const name = spell.name;
  const level = spell.level === 0 ? "Cantrip" : spell.level;
  const casting_time = spell.casting_time;
  const duration = spell.duration;
  const range = spell.range;
  const damage_type =
    spell.damage_type === "no damage type" ? "None" : spell.damage_type;
  const school =
    spell.school === "Conjuration" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Conjuration-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Abjuration" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Abjuration-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Divination" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Divination-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Enchantment" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Enchantment-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Evocation" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Evocation-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Illusion" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Illusion-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Necromancy" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Necromancy-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : spell.school === "Transmutation" ? (
      <img
        src="https://blackcitadelrpg.com/wp-content/uploads/2021/09/Transmutation-Sigil.jpg"
        width="60"
        height="60"
      />
    ) : (
      "Unknown school"
    );

  return (
    <div className="main-spell-card-container">
      <div className="spell-card-info-container">
        <span className="spell-card-school-image">{school}</span>
        <Link to={`/individual-spell/${spell.id}`}>
          <h4 className="spell-card-item-name">{name}</h4>
        </Link>
        <h4 className="spell-card-item-level">Level: {level}</h4>
        <h4 className="spell-card-item-time">Casting Time: {casting_time}</h4>
        <h4 className="spell-card-item-duration">Duration: {duration}</h4>
        <h4 className="spell-card-item-range">Range: {range}</h4>
        <h4 className="spell-card-item-type">Damage Type: {damage_type}</h4>
      </div>
    </div>
  );
};

export default SpellCard;
