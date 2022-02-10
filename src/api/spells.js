import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "/api/spells"; // when deploying to heroku have this one running

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
