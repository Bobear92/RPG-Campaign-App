// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

const { createUser } = require("./users");
const { createSpellInfo } = require("./classSpellInfo");

async function buildTables() {
  try {
    client.connect();

    async function dropTables() {
      console.log("Dropping All Tables...");
      // drop all tables, in the correct order
      try {
        await client.query(`
        DROP TABLE IF EXISTS feedback;
        DROP TABLE IF EXISTS home_brew_rules;
        DROP TABLE IF EXISTS rule_descriptions;
        DROP TABLE IF EXISTS class_spell_info;
        DROP TABLE IF EXISTS equipment;
        DROP TABLE IF EXISTS monsters;
        DROP TABLE IF EXISTS spells;
        DROP TABLE IF EXISTS campaigns;
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

        // gm tables
        console.log("starting gm tables");

        // campaign table

        console.log("starting to create campaign table");
        await client.query(`
          CREATE TABLE campaigns (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL, 
            gm TEXT NOT NULL
          )
          `);

        console.log("finished creating campaign table");

        console.log("finished gm tables");

        // data tables

        console.log("starting data tables");

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
          );
        `);

        console.log("finished creating equipment table");

        console.log("finished creating data tables");

        // class tables

        console.log("starting to create class tables");

        // spell slots
        console.log("creating spell slot / spells known table");
        await client.query(`
              CREATE TABLE class_spell_info (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                array_info TEXT,
                first integer ARRAY,
                second integer ARRAY,
                third integer ARRAY,
                fourth integer ARRAY,
                fifth integer ARRAY,
                sixth integer ARRAY,
                seventh integer ARRAY,
                eighth integer ARRAY,
                ninth integer ARRAY,
                tenth integer ARRAY,
                eleventh integer ARRAY,
                twelfth integer ARRAY,
                thirteenth integer ARRAY,
                fourteenth integer ARRAY,
                fifteenth integer ARRAY,
                sixteenth integer ARRAY,
                seventeenth integer ARRAY,
                eighteenth integer ARRAY,
                nineteenth integer ARRAY,
                twentieth integer ARRAY
              );
            `);

        console.log("finished creating spell slot / spells know table");

        console.log("Finished creating class tables");

        //mechanics tables

        console.log("starting to create mechanics tables");

        // official rules
        console.log("Starting to create rules table");
        await client.query(`
            CREATE TABLE rule_descriptions (
              id SERIAL PRIMARY KEY,
              name varchar(255) UNIQUE NOT NULL,
              description TEXT
            );
        `);

        console.log("Finished creating rule description table");

        // Home brew rules

        console.log("starting to create home brew rule description table");
        await client.query(`
              CREATE TABLE home_brew_rules (
                id SERIAL PRIMARY KEY,
                name varchar(255) UNIQUE NOT NULL,
                description TEXT, 
                visible BOOLEAN DEFAULT 'false', 
                gm TEXT
              );
        `);

        console.log("Finished creating home brew rules table");

        console.log("Finished creating mechanics tables");

        // player interactive tables

        console.log("Starting to create player interactive tables");

        // feed back
        console.log("starting to create feed back table");
        await client.query(`
           CREATE Table feedback (
            id SERIAL PRIMARY KEY,
            name varchar(255) UNIQUE NOT NULL,
            feedback text,
            gm text
           );
        `);

        console.log("finished creating feedback table");

        console.log("Finished building tables");
      } catch (error) {
        console.log(error);
        console.error("Error building tables");
      }
    }

    await dropTables();
    await createTables();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Populating user data");
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

    console.log("Finished populating user data");

    console.log("Populating class data");
    async function createInitialSpellSlotInfo() {
      try {
        const spellSlotData = [
          {
            name: "bard",
            array_info:
              "Index 0 - 9 are cantrip to lvl 9 spell slots. Index 10 is spells known 0 if class prepares spells a different way",
            first: [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            second: [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 5],
            third: [2, 4, 2, 0, 0, 0, 0, 0, 0, 0, 6],
            fourth: [3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 7],
            fifth: [3, 4, 3, 2, 0, 0, 0, 0, 0, 0, 8],
            sixth: [3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 9],
            seventh: [3, 4, 3, 3, 1, 0, 0, 0, 0, 0, 10],
            eighth: [3, 4, 3, 3, 2, 0, 0, 0, 0, 0, 11],
            ninth: [3, 4, 3, 3, 3, 1, 0, 0, 0, 0, 12],
            tenth: [4, 4, 3, 3, 3, 2, 0, 0, 0, 0, 14],
            eleventh: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0, 15],
            twelfth: [4, 4, 3, 3, 3, 2, 1, 0, 0, 0, 15],
            thirteenth: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0, 16],
            fourteenth: [4, 4, 3, 3, 3, 2, 1, 1, 0, 0, 18],
            fifteenth: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0, 19],
            sixteenth: [4, 4, 3, 3, 3, 2, 1, 1, 1, 0, 19],
            seventeenth: [4, 4, 3, 3, 3, 2, 1, 1, 1, 1, 20],
            eighteenth: [4, 4, 3, 3, 3, 3, 1, 1, 1, 1, 22],
            nineteenth: [4, 4, 3, 3, 3, 3, 2, 1, 1, 1, 22],
            nineteenth: [4, 4, 3, 3, 3, 3, 2, 1, 1, 1, 22],
            twentieth: [4, 4, 3, 3, 3, 3, 2, 2, 1, 1, 22],
          },
        ];

        const spell_slot_info = await Promise.all(
          spellSlotData.map(createSpellInfo)
        );

        console.log("Spell slot info created created:");
        console.log(spell_slot_info, "spell slot info");
        console.log("Finished creating spell slot info!");
      } catch (error) {
        console.error("Error creating spell slot info!");
        throw error;
      }
    }
    console.log("Finished populating class data");

    await createInitialUsers();
    await createInitialSpellSlotInfo();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
