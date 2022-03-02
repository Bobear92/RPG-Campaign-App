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
        DROP TABLE IF EXISTS equipment;
        DROP TABLE IF EXISTS monsters;
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
        // users table
        console.log("creating users");
        await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        admin BOOLEAN DEFAULT 'false',
        gm Boolean Default 'false'
      );
    `);

        console.log("finished user table");

        // spells table
        console.log("creating spells");
        await client.query(`
          CREATE TABLE spells (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            level INTEGER,
            school TEXT NOT NULL,
            attack_type TEXT NOT NULL,
            damage_type TEXT NOT NULL,
            casting_time TEXT NOT NULL, 
            range TEXT NOT NULL, 
            concentration BOOLEAN DEFAULT 'false',
            components TEXT ARRAY, 
            materials TEXT NOT NULL,
            duration TEXT NOT NULL,
            ritual BOOLEAN DEFAULT 'false', 
            classes TEXT ARRAY,
            subclass TEXT ARRAY,
            description TEXT NOT NULL,
            higher_levels TEXT ARRAY, 
            visible BOOLEAN DEFAULT 'false', 
            gm_notes TEXT NOT NULL
            );`);
        console.log("finished creating spell table");

        // monster table
        console.log("creating monsters");
        await client.query(`
            CREATE TABLE monsters (
              id SERIAL PRIMARY KEY,
              name varchar(255) UNIQUE NOT NULL,
              type TEXT NOT NULL, 
              size TEXT NOT NULL, 
              armor_class INTEGER, 
              hit_points INTEGER, 
              hit_dice TEXT NOT NULL, 
              speed TEXT ARRAY, 
              strength INTEGER, 
              dexterity INTEGER, 
              constitution INTEGER, 
              intelligence INTEGER, 
              wisdom INTEGER,
              charisma INTEGER, 
              senses TEXT ARRAY, 
              saving_throws TEXT ARRAY, 
              skills TEXT ARRAY, 
              languages TEXT NOT NULL, 
              challenge_rating TEXT NOT NULL, 
              condition_immunities TEXT ARRAY, 
              damage_immunities TEXT ARRAY, 
              damage_resistances TEXT ARRAY, 
              damage_vulnerabilities TEXT ARRAY, 
              actions TEXT ARRAY, 
              legendary_actions TEXT ARRAY, 
              ability_array TEXT ARRAY, 
              spell_casting_spell_array TEXT ARRAY, 
              spell_casting_desc TEXT NOT NULL, 
              spell_casting_class TEXT NOT NULL, 
              spell_casting_slots TEXT ARRAY, 
              xp INTEGER,
              visible BOOLEAN DEFAULT 'false', 
              gm_notes TEXT NOT NULL
            );`);

        console.log("finished creating monsters table");

        // equipment table
        console.log("creating equipment table");

        await client.query(`
          CREATE TABLE equipment (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            description TEXT ARRAY, 
            cost TEXT ARRAY,
            weight TEXT, 
            item_type TEXT NOT NULL, 
            gear_cat TEXT, 
            weapon_cat TEXT,
            damage TEXT ARRAY,
            two_handed_damage TEXT ARRAY,
            range_type TEXT, 
            range TEXT ARRAY,
            properties TEXT ARRAY,
            armor_cat text,
            ac_base INTEGER,
            ac_dex BOOLEAN DEFAULT 'false',
            ac_max_dex_bonus INTEGER,
            stealth_dis BOOLEAN DEFAULT 'false',
            str_min INTEGER,
            speed TEXT ARRAY,
            carrying_capacity TEXT,
            visible BOOLEAN DEFAULT 'false', 
            gm_notes TEXT NOT NULL
          )
        `);

        console.log("finished creating equipment table");

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
          {
            username: "Admin",
            password: "12345678",
            admin: true,
            gm: false,
          },
          {
            username: "testPlayer",
            password: "12345678",
            admin: false,
            gm: false,
          },
          {
            username: "testGm",
            password: "12345678",
            admin: false,
            gm: true,
          },
        ];

        const users = await Promise.all(usersToCreate.map(createUser));

        console.log("Users created:");
        console.log(users, "users");
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
