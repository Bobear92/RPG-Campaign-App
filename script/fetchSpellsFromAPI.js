const axios = require("axios");
const { client } = require("../db");

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDSpellUrl = "https://www.dnd5eapi.co"; // when getting the spell url to use

async function spellDetails(url) {
  try {
    return axios.get(`${DnDSpellUrl}${url}`);
  } catch (error) {
    throw error;
  }
}

//a copy of the createSpell function from db/spells.js, but returns the promise instead of awaiting the data
//this is so we aren't trying to use await inside of a map (which is not a good idea!)
async function createSpell(
  name,
  level,
  school,
  attack_type,
  damage_type,
  casting_time,
  range,
  concentration,
  components,
  materials,
  duration,
  ritual,
  classes,
  subclass,
  description,
  higher_levels,
  visible,
  gm_notes
) {
  try {
    return client.query(
      `INSERT INTO spells(name, level, school, attack_type, damage_type, casting_time, range, concentration, components, materials, duration, ritual, classes, subclass, description, higher_levels, visible, gm_notes)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *;
        `,
      [
        name,
        level,
        school,
        attack_type,
        damage_type,
        casting_time,
        range,
        concentration,
        components,
        materials,
        duration,
        ritual,
        classes,
        subclass,
        description,
        higher_levels,
        visible,
        gm_notes,
      ]
    );
  } catch (error) {
    throw error;
  }
}

const createSpellTable = async () => {
  try {
    //first, open a connection to our db
    await client.connect();
    const { data } = await axios.get(`${DnD}spells`);

    const dataResults = data.results;
    const details = dataResults.map((spell) => {
      const spellUrl = spell.url;
      return spellUrl;
    });

    const spellDescriptionsResponse = await Promise.all(
      details.map((spellUrl) => {
        const spell = spellDetails(spellUrl);
        return spell;
      })
    );

    const spellDescriptions = spellDescriptionsResponse.map((d) => d.data); //because we are returning a promise for the axios response for each spell, we need to
    //map over the resolved responses and pull out the data. This gives us an array of the spell objects

    const spellPromises = spellDescriptions.map((spell, idx) => {
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
      const concentration = !spell.concentration ? false : spell.concentration;
      const components = !spell.components ? [] : spell.components;
      const materials = !spell.material ? "no materials" : spell.material;
      const duration = !spell.duration ? "no duration" : spell.duration;
      const ritual = !spell.ritual ? false : spell.ritual;
      const description = !spell.desc ? ["no description"] : spell.desc;
      const higherLevels = !spell.higher_level ? [] : spell.higher_level;
      const notes = "no spell notes";

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
        true,
        notes
      );
    });

    //This map returns an array of the promises returned by create spell

    await Promise.all(spellPromises);

    console.log("Done creating spells");

    //we need to close the connection to our db
    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createSpellTable();
