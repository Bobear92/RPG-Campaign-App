const { client } = require("./index");

async function createUser({ username, password, admin, gm }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users(username, password, admin, gm)
          VALUES($1, $2, $3, $4)
          ON CONFLICT (username) DO NOTHING
          RETURNING *;
          `,
      [username, password, admin, gm]
    );

    return user.username;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=$1;
    `,
      [username]
    );

    if (!user) {
      return;
    }

    if (user.password !== password) {
      return;
    }
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE id=$1;
    `,
      [id]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM users
    WHERE username=$1;
    `,
      [username]
    );
    if (!rows || !rows.length) {
      return null;
    }

    const [user] = rows;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * from users 
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function makeGM(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET gm='true'
        WHERE id=$1
        RETURNING *;
      
      `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    DELETE FROM users
    where id = $1
    RETURNING *;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  makeGM,
  deleteUser,
};
