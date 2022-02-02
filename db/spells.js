const { client } = require("./index");

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
    const {
      rows: [spell],
    } = await client.query(
      `
            INSERT INTO spells(name, level, school, attack_type, damage_type, casting_time, range, concentration, components, materials, duration, ritual, classes, subclass, description, higher_levels, visible, gm_notes)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            ON CONFLICT (name) DO NOTHING
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

    return spell;
  } catch (error) {
    throw error;
  }
}

async function getAllMySpells() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM spells;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSpell,
  getAllMySpells,
};
