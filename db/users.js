const { client } = require("./index");

async function createUser({ username, password, admin }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password, admin)
          VALUES($1, $2, $3)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
          `,
      [username, password, admin]
    );

    return user.username;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
};
