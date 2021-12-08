// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

const { createUser } = require("./users");

async function buildTables() {
  try {
    client.connect();

    async function dropTables() {
      console.log("Dropping All Tables...");
      // drop all tables, in the correct order
      try {
        await client.query(`
        DROP TABLE IF EXISTS spells;
        DROP TABLE IF EXISTS users;
      `);

        console.log("Finished dropping tables");
      } catch (error) {
        console.error(error);
        console.error("Error dropping tables");
      }
    }

    // build tables in correct order

    async function createTables() {
      console.log("Starting to build tables...");
      // create all tables, in the correct order

      try {
        await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        admin BOOLEAN DEFAULT 'false'
      );
    `);

        console.log("finished user table");

        await client.query(`
          CREATE TABLE spells (
            id SERIAL PRIMARY kEY,
            name varchar(255) UNIQUE NOT NULL,
            level INTEGER,
            school TEXT NOT NULL,
            "attackType" TEXT NOT NULL,
            "castingTime" TEXT NOT NULL, 
            range TEXT NOT NULL, 
            components TEXT ARRAY, 
            materials TEXT NOT NULL,
            duration TEXT NOT NULL,
            ritual BOOLEAN DEFAULT 'false', 
            classes TEXT ARRAY,
            subclass TEXT ARRAY,
            description TEXT NOT NULL,
            "higherLevels" TEXT ARRAY
            );`);
        console.log("finished creating spell table");

        console.log("Finished building tables");
      } catch (error) {
        console.error("Error building tables");
      }
    }

    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    async function createInitialUsers() {
      console.log("Starting to create users...");
      try {
        const usersToCreate = [
          { username: "Robert", password: "Yaraisgreat!", admin: true },
          { username: "test1", password: "12345678", admin: false },
        ];

        const users = await Promise.all(usersToCreate.map(createUser));

        console.log("Users created:");
        console.log(users);
        console.log("Finished creating users!");
      } catch (error) {
        console.error("Error creating users!");
        throw error;
      }
    }

    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
