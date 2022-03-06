import axios from "axios";

// const BASE = "http://localhost:5000/api/"; // When in development have this one running
const BASE = "https://rpg-campaign-app.herokuapp.com/api/"; // when deploying to heroku have this one running

// below are the spell functions for the outside api

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the monster url to use

// 5E api
export async function allSpells() {
  try {
    const { data } = await axios.get(`${DnD}spells`);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function eachSpell(url) {
  try {
    const { data } = await axios.get(`${DnDUrl}${url}`);
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
    const { data } = await axios.post(`${BASE}spells`, {
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
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMySpells() {
  try {
    const { data } = await axios.get(`${BASE}spells`);
    return data;
  } catch (error) {
    throw error;
  }
}
