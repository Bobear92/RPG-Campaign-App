// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

const { createUser } = require("./users");
const { createRace } = require("./races");

async function buildTables() {
  try {
    client.connect();

    async function dropTables() {
      console.log("Dropping All Tables...");
      // drop all tables, in the correct order
      try {
        await client.query(`
        DROP TABLE IF EXISTS races;
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
            range_type TEXT, 
            range TEXT ARRAY,
            properties TEXT ARRAY,
            speed TEXT ARRAY,
            carrying_capacity TEXT,
            visible BOOLEAN DEFAULT 'false', 
            gm_notes TEXT NOT NULL
          )
        `);

        console.log("finished creating equipment table");

        console.log("creating race tables");
        await client.query(`
          CREATE TABLE races (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            ability_score_desc TEXT NOT NULL,
            ability_score_stats TEXT NOT NULL,
            ability_score_num INTEGER, 
            age TEXT NOT NULL,
            size_desc TEXT NOT NULL,
            size TEXT NOT NULL,
            speed_desc TEXT NOT NULL,
            speed INTEGER,
            vision TEXT NOT NULL,
            languages TEXT ARRAY,
            sub_races TEXT ARRAY,
            race_feature TEXT ARRAY
            
           );`);
        console.log("finished creating race table");

        console.log("finished creating races");

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
    async function createInitialRaces() {
      console.log("Starting to create races ...");
      try {
        const racesToCreate = [
          {
            name: "Dwarf",
            ability_score_desc: "Dwarves constitution score increases by 2.",
            ability_score_stats: "Constitution",
            ability_score_num: 2,
            age: "Dwarves mature at the same rate as humans, but they are considered young until they reach the age of 50. On average they live about 350 years.",
            size_desc:
              "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Their size is medium",
            size: "Medium",
            speed_desc:
              "Dwarves walking base speed is 25ft. Dwarves speed is not reduced by heavy armor.",
            speed: 25,
            vision: "Darkvision",
            languages: ["common", "dwarvish"],
            sub_races: ["Hill Dwarf", "Mountain Dwarf"],
            race_feature: [
              "Dwarven Resilience - Dwarves has advantage on saving throws against poison and dwarves have resistance against poison damage.",

              "Dwarven combat training - Dwarves have proficiency with the battleaxe, handaxe, light hammer, and warhammer.",

              "Tool proficiency - Dwarves have proficiency with the artisan's tool of your choice: smith's tools, brewer's supplies, or mason's tools.",

              "stonecunning - Whenever dwarves make an intelligence (history) check related to the origin of stonework, dwarves are considered proficient in the History skill and add double the proficiency bonus to the check, instead of the normal proficiency.",
            ],
          },
        ];
        const races = await Promise.all(racesToCreate.map(createRace));
        console.log("Races created:");
        console.log(races, "races");
        console.log("Finished creating races!");
      } catch (error) {
        console.error("Error creating races!");
        throw error;
      }
    }

    await createInitialUsers();
    await createInitialRaces();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
