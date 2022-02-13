const { client } = require("./index");

async function getAllMyMonsters() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM monsters;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMyMonsters,
};
