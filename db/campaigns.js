const { client } = require("./index");

async function createCampaign({ name, gm }) {
  try {
    const {
      rows: [data],
    } = await client.query(
      `
          INSERT INTO campaigns(name, gm)
          VALUES($1, $2)
          RETURNING *;
          `,
      [name, gm]
    );
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { createCampaign };
