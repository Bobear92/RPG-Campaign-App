import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./IndividualMonster.css";

const IndividualMonster = ({ allMyMonsters, GM, allMySpells }) => {
  const { id } = useParams();
  const monster = allMyMonsters.find((element) => element.id == id);

  console.log(monster);

  const name = monster.name;
  const size = monster.size;
  const type = monster.type;
  const str = monster.strength;
  const dex = monster.dexterity;
  const con = monster.constitution;
  const int = monster.intelligence;
  const wis = monster.wisdom;
  const cha = monster.charisma;
  const saving_throws = monster.saving_throws.map((data) => {
    return `${data[0]} +${data[1]}`;
  });

  const skills = monster.skills.map((data) => {
    return `${data[0]} +${data[1]}`;
  });

  const senses = monster.senses;
  const conditional = monster.condition_immunities;
  const damage = monster.damage_immunities;
  const resistance = monster.damage_resistances;
  const vulnerability = monster.damage_vulnerabilities;
  const languages = monster.languages;
  const challenge = monster.challenge_rating;
  const xp = monster.xp;
  const AC = monster.armor_class;
  const HP = monster.hit_points;
  const die = monster.hit_dice;
  const speed = monster.speed;
  const special_ability = monster.ability_array;
  const spell_desc = monster.spell_casting_desc;
  const slots = monster.spell_casting_slots;
  const spells = monster.spell_casting_spell_array;
  const actions = monster.actions;
  const legendary = monster.legendary_actions;
  const gmNotes =
    monster.gm_notes === "no monster notes"
      ? "No Dungeon Master Notes on this monster."
      : monster.gm_notes;
  const visible = monster.visible
    ? "Players can see this monster."
    : "This monster is hidden from players.";

  const modifierFunction = (mod) => {
    return mod === 1
      ? "-5"
      : mod === 2
      ? "-4"
      : mod === 3
      ? "-4"
      : mod === 4
      ? "-3"
      : mod === 5
      ? "-3"
      : mod === 6
      ? "-2"
      : mod === 7
      ? "-2"
      : mod === 8
      ? "-1"
      : mod === 9
      ? "-1"
      : mod === 10
      ? "0"
      : mod === 11
      ? "0"
      : mod === 12
      ? "+1"
      : mod === 13
      ? "+1"
      : mod === 14
      ? "+2"
      : mod === 15
      ? "+2"
      : mod === 16
      ? "+3"
      : mod === 17
      ? "+3"
      : mod === 18
      ? "+4"
      : mod === 19
      ? "+4"
      : mod === 20
      ? "+5"
      : mod === 21
      ? "+5"
      : mod === 22
      ? "+6"
      : mod === 23
      ? "+6"
      : mod === 24
      ? "+7"
      : mod === 25
      ? "+7"
      : mod === 26
      ? "+8"
      : mod === 27
      ? "+8"
      : mod === 28
      ? "+9"
      : mod === 29
      ? "+9"
      : mod === 30
      ? "+10"
      : null;
  };

  return (
    <div className="individual-monster-main-container">
      <div className="individual-monster-border"></div>
      <div className="individual-monster-name-container">
        <div className="individual-monster-name-inner-container">
          <h1 className="individual-monster-name">{name}</h1>
          <p className="individual-monster-size-type">
            {size}, {type}
          </p>
        </div>
      </div>
      <div className="individual-monster-border"></div>
      <div className="individual-monster-stats-and-ability-container">
        <div className="individual-monster-stats-container">
          <div className="individual-monster-stats-inner-container">
            <p className="individual-monster-stat">Armor Class: {AC}</p>
            <p className="individual-monster-stat">
              Hit Points: {HP} ({die})
            </p>
            <div className="individual-monster-stat-speed">
              <p>Speed:</p>
              {speed.map((data, idx) => {
                return (
                  <p
                    key={`data in speed map: ${data} at ${idx}`}
                    className={"individual-monster-stat-speed-map"}
                  >
                    {data}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="individual-monster-ability-container">
          <div className="individual-monster-ability">
            <p>Str</p>
            <p>
              {str} ({modifierFunction(str)})
            </p>
          </div>
          <div className="individual-monster-ability">
            <p>Dex</p>
            <p>
              {dex} ({modifierFunction(dex)})
            </p>
          </div>
          <div className="individual-monster-ability">
            <p>Con</p>
            <p>
              {con} ({modifierFunction(con)})
            </p>
          </div>
          <div className="individual-monster-ability">
            <p>Int</p>
            <p>
              {int} ({modifierFunction(int)})
            </p>
          </div>
          <div className="individual-monster-ability">
            <p>Wis</p>
            <p>
              {wis} ({modifierFunction(wis)})
            </p>
          </div>
          <div className="individual-monster-ability">
            <p>Cha</p>
            <p>
              {cha} ({modifierFunction(cha)})
            </p>
          </div>
        </div>
      </div>
      <div className="individual-monster-border"></div>
      <div className="individual-monster-skills-container">
        {saving_throws.length ? (
          <div className="individual-monster-skill">
            {saving_throws.map((data, idx) => {
              return (
                <p key={`data in saving throws map: ${data} at ${idx}`}>
                  {data}
                </p>
              );
            })}
          </div>
        ) : null}
        {skills.length ? (
          <div className="individual-monster-skills">
            {skills.map((data, idx) => {
              return (
                <p key={`data in skills map: ${data} at ${idx}`}>{data}</p>
              );
            })}
          </div>
        ) : null}

        {senses.length ? (
          <div className="individual-monster-skills">
            {senses.map((data, idx) => {
              return (
                <p key={`data in senses map: ${data} at ${idx}`}>{data}</p>
              );
            })}
          </div>
        ) : null}

        {conditional.length ? (
          <div className="individual-monster-skills">
            {conditional.map((data, idx) => {
              return (
                <p
                  key={`data in conditional immunities map: ${data} at ${idx}`}
                >
                  Conditional Immunities: {data}
                </p>
              );
            })}
          </div>
        ) : null}

        {damage.length ? (
          <div className="individual-monster-skills">
            {damage.map((data, idx) => {
              return (
                <p key={`data in damage immunities map: ${data} at ${idx}`}>
                  Damage Immunities: {data}
                </p>
              );
            })}
          </div>
        ) : null}

        {resistance.length ? (
          <div className="individual-monster-skills">
            {resistance.map((data, idx) => {
              return (
                <p key={`data in damage resistance map: ${data} at ${idx}`}>
                  Damage Resistances: {data}
                </p>
              );
            })}
          </div>
        ) : null}

        {vulnerability.length ? (
          <div className="individual-monster-skills">
            {vulnerability.map((data, idx) => {
              return (
                <p key={`data in damage vulnerability map: ${data} at ${idx}`}>
                  Damage vulnerabilities: {data}
                </p>
              );
            })}
          </div>
        ) : null}

        {languages ? (
          <p className="individual-monster-skills">Languages: {languages}.</p>
        ) : null}

        <p className="individual-monster-skills">
          Challenge: {challenge} ({xp} XP)
        </p>
      </div>
      {monster.ability_array.length ? (
        <>
          <div className="individual-monster-border"></div>
          <div className="individual-monster-special-abilities-container">
            {special_ability.map((data, idx) => {
              return (
                <p key={`data in special ability map: ${data} at ${idx}`}>
                  {data}
                </p>
              );
            })}
          </div>
        </>
      ) : null}
      {monster.spell_casting_desc ? (
        <>
          <div className="individual-monster-spellcasting-container">
            <p className="individual-monster-spellcasting-item">
              Spellcasting: {spell_desc}
            </p>
            {slots.map((slot, idx) => {
              return (
                <span
                  key={`data in spell slot map: ${slot} at ${idx}`}
                  className={"individual-monster-spellcasting-spell-slot"}
                >
                  {slot}:
                  {spells.map((spell, idx) => {
                    if (slot.startsWith("1st") && spell[1] === "1") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`1st level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("2nd") && spell[1] === "2") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`2nd level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("3rd") && spell[1] === "3") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`3rd level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("4th") && spell[1] === "4") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`4th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("5th") && spell[1] === "5") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`5th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("6th") && spell[1] === "6") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`6th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("7th") && spell[1] === "7") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`7th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("8th") && spell[1] === "8") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`8th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                    if (slot.startsWith("9th") && spell[1] === "9") {
                      const data = allMySpells.find(
                        (element) => element.name == spell[0]
                      );
                      return (
                        <p
                          key={`9th level spell data in spell map: ${spell} at ${idx}`}
                          className={"individual-monster-spellcasting-spell"}
                        >
                          <Link to={`/individual-spell/${data.id}`}>
                            {spell[0]}
                          </Link>
                        </p>
                      );
                    }
                  })}
                </span>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="individual-monster-border"></div>
      <div className="individual-monster-actions-container">
        <h2>Actions</h2>
        {actions.map((data, idx) => {
          return data[1] == "no usage specified" ? (
            <p key={`data in actions map: ${data} at ${idx}`}>{data[0]}</p>
          ) : (
            <p>
              {data[1]}- {data[0]}
            </p>
          );
        })}
      </div>
      <div className="individual-monster-border"></div>
      {legendary[0] != "no legendary actions" ? (
        <div className="individual-monster-legendary-actions-container">
          <h2>Legendary Actions</h2>
          {legendary.map((data, idx) => {
            return (
              <p key={`data in legendary actions map: ${data} at ${idx}`}>
                {data}
              </p>
            );
          })}
        </div>
      ) : null}

      <div className="individual-monster-border"></div>
      {GM ? (
        <div className="individual-monster-gm-container">
          <p>Dungeon Master Notes: {gmNotes}</p>
          <p>Visible: {visible}</p>
        </div>
      ) : null}
    </div>
  );
};

export default IndividualMonster;
