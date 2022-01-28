import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "/api/spells"; // when deploying to heroku have this one running
const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDSpellUrl = "https://www.dnd5eapi.co"; // when getting the spell url to use

// below are the spells functions for the 5E api
export async function getAllSpells() {
  try {
    const { data } = await axios.get(`${DnD}spells`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function spellDetails(url) {
  try {
    const { data } = await axios.get(`${DnDSpellUrl}${url}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// below are spell functions for the personal database

export async function createSpell(
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
  classes,
  subclass,
  description,
  higherLevels,
  visible
) {
  // console.log(name);
  try {
    // console.log("can i see this?");
    const { data } = await axios.post(`${BASE}spells`, {
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
      classes,
      subclass,
      description,
      higherLevels,
      visible,
    });
    console.log("can i see this?");
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
