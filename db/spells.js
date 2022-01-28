const { client } = require("./index");

async function createSpell(
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
  try {
    const {
      rows: [spell],
    } = await client.query(
      `
            INSERT INTO spells(name, level, school, "attackType", "damageType", "castingTime", range, concentration, components, materials, duration, ritual, classes, subclass, description, "higherLevels", visible)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `,
      [
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
      ]
    );

    return spell;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSpell,
};
