const { client } = require("./index");

async function getAllMyEquipment() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM equipment;
        `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMyEquipment,
};
