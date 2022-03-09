const { client } = require("./index");

async function createFeedback({ name, feedback, gm }) {
  try {
    const {
      rows: [data],
    } = await client.query(
      `
          INSERT INTO feedback(name, description, visible, gm)
          VALUES($1, $2, $3)
          RETURNING *;
          `,
      [name, feedback, gm]
    );
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { createFeedback };
