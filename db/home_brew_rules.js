const { client } = require("./index");

async function createRule({ name, description, visible, gm }) {
  try {
    const {
      rows: [rule],
    } = await client.query(
      `
        INSERT INTO home_brew_rules(name, description, visible, gm)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, description, visible, gm]
    );
    return rule;
  } catch (error) {
    throw error;
  }
}

async function deleteRule(id) {
  try {
    const {
      rows: [rule],
    } = await client.query(
      `
    DELETE FROM home_brew_rules
    where id = $1
    RETURNING *;
    `,
      [id]
    );
    return rule;
  } catch (error) {
    throw error;
  }
}

async function updateRuleVisibleStatus({ id, visible }) {
  try {
    const {
      rows: [rule],
    } = await client.query(
      `
    UPDATE home_brew_rules
    SET visible=$1
    WHERE id=$2
    RETURNING *;`,
      [visible, id]
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

module.exports = {
  createRule,
  getAllMyRules,
  deleteRule,
  updateRuleVisibleStatus,
};
