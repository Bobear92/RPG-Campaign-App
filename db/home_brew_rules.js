const { client } = require("./index");

async function createRule({ name, description, gm }) {
  try {
    const {
      rows: [rule],
    } = await client.query(
      `
        INSERT INTO home_brew_rules(name, description, gm)
        VALUES($1, $2, $3)
        RETURNING *;
        `,
      [name, description, gm]
    );
    return rule;
  } catch (error) {
    throw error;
  }
}

async function getAllMyRules() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM home_brew_rules;
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { createRule, getAllMyRules };
