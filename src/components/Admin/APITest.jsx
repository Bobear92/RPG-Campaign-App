import React, { useState, useEffect } from "react";
import { eachMonster, allMonsters } from "../../api/monsters";

const APITest = ({ everyMonster }) => {
  const monsterMap = everyMonster.map((monster) => {
    const name = monster.name;
    const type = monster.type;
    const size = monster.size;
    const armor_class = monster.armor_class;
    const hit_points = monster.hit_points;
    const hit_dice = monster.hit_dice;

    const speed = [];
    for (const speedType in monster.speed) {
      speed.push(`${speedType}: ${monster.speed[speedType]}`);
    }

    const strength = monster.strength;
    const dexterity = monster.dexterity;
    const constitution = monster.constitution;
    const intelligence = monster.intelligence;
    const wisdom = monster.wisdom;
    const charisma = monster.charisma;

    // saving throws and skills need work
    // const saving_throws = [];

    // monster.proficiencies.map((object) => {
    //   for (const key in object) {
    //     if (key.name.startsWith("Saving")) {
    //       const value = 0;
    //       if (key == value) {
    //         value += key;
    //       }
    //       saving_throws.push(`${key.name}: ${value}`);
    //     }
    //   }
    // });

    const senses = [];
    for (const sense in monster.senses) {
      senses.push(`${sense}: ${monster.senses[sense]}`);
    }

    const languages = monster.languages;
    const challenge_rating = monster.challenge_rating;

    const condition_immunities = [];
    for (const immunity in monster.condition_immunities) {
      condition_immunities.push(monster.condition_immunities[immunity].name);
    }
    const damage_immunities = monster.damage_immunities;
    const damage_resistances = monster.damage_resistances;
    const damage_vulnerabilities = monster.damage_vulnerabilities;

    const special_abilities = [];

    for (const ability in monster.special_abilities) {
      special_abilities.push(monster.special_abilities[ability].name);
    }

    const actions = [];

    const xp = monster.xp;

    return special_abilities;
  });

  // console.log(everyMonster, "still not working");
  console.log(monsterMap, "this loop working?");

  return (
    <div>
      <p>This is where I test api before I put it in the scripts file</p>
    </div>
  );
};

export default APITest;
