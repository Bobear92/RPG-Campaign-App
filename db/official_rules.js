const { client } = require("./index");

async function getAllOfficialRules() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM rule_descriptions;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllOfficialRules,
};
