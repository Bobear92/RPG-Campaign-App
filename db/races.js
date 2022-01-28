const { client } = require("./index");

async function createRace({
  name,
  ability_score_desc,
  ability_score_stats,
  ability_score_num,
  age,
  size_desc,
  size,
  speed_desc,
  speed,
  vision,
  languages,
  sub_races,
  race_feature,
}) {
  try {
    const {
      rows: [race],
    } = await client.query(
      `
            INSERT INTO races(name,
              ability_score_desc,
              ability_score_stats,
              ability_score_num,
                age,
                size_desc,
                size,
                speed_desc,
                speed,
                vision,
                languages,
                sub_races,
                race_feature)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `,
      [
        name,
        ability_score_desc,
        ability_score_stats,
        ability_score_num,
        age,
        size_desc,
        size,
        speed_desc,
        speed,
        vision,
        languages,
        sub_races,
        race_feature,
      ]
    );

    return race;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRace,
};
