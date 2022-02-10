const axios = require("axios");
const { client } = require("../db");

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the url to use

async function eachMonster(url) {
  try {
    return axios.get(`${DnDUrl}${url}`);
  } catch (error) {
    throw error;
  }
}

//a copy of the createMonster function from db/monsters.js, but returns the promise instead of awaiting the data
//this is so we aren't trying to use await inside of a map (which is not a good idea!)
async function createMonster(
  name,
  type,
  size,
  armor_class,
  hit_points,
  hit_dice,
  speed,
  strength,
  dexterity,
  constitution,
  intelligence,
  wisdom,
  charisma,
  senses,
  languages,
  challenge_rating,
  condition_immunities,
  damage_immunities,
  damage_resistances,
  damage_vulnerabilities,
  xp
) {
  try {
    return client.query(
      `INSERT INTO monsters(name, type, size, armor_class, hit_points, hit_dice, speed, strength, dexterity, constitution, intelligence, wisdom, charisma, senses, languages, challenge_rating, condition_immunities, damage_immunities, damage_resistances, damage_vulnerabilities, xp)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *;`,
      [
        name,
        type,
        size,
        armor_class,
        hit_points,
        hit_dice,
        speed,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        senses,
        languages,
        challenge_rating,
        condition_immunities,
        damage_immunities,
        damage_resistances,
        damage_vulnerabilities,
        xp,
      ]
    );
  } catch (error) {
    throw error;
  }
}

const createMonsterTable = async () => {
  try {
    await client.connect();
    const { data } = await axios.get(`${DnD}monsters`);

    const dataResults = data.results;
    const details = dataResults.map((monster) => {
      const monsterUrl = monster.url;
      return monsterUrl;
    });

    const monsterDescriptionsResponse = await Promise.all(
      details.map((monsterUrl) => {
        const monster = eachMonster(monsterUrl);
        return monster;
      })
    );

    const monsterDescriptions = monsterDescriptionsResponse.map((d) => d.data); //because we are returning a promise for the axios response for each monster, we need to
    //map over the resolved responses and pull out the data. This gives us an array of the monster objects
    console.log(monsterDescriptions[0], "should be aboleth");
    const monsterPromises = monsterDescriptions.map((monster, indx) => {
      const name = monster.name;
      const type = monster.type;
      const size = monster.size;
      const armor_class = monster.armor_class;
      const hit_points = monster.hit_points;
      const hit_dice = monster.hit_dice;

      const speed = [];
      for (const speedType in monster.speed) {
        speed.push(`${speedType}: ${monster.speed[speedType]}`);
      }

      const strength = monster.strength;
      const dexterity = monster.dexterity;
      const constitution = monster.constitution;
      const intelligence = monster.intelligence;
      const wisdom = monster.wisdom;
      const charisma = monster.charisma;

      const senses = [];
      for (const sense in monster.senses) {
        senses.push(`${sense}: ${monster.senses[sense]}`);
      }

      // saving throws
      // skills

      const languages = monster.languages;
      const challenge_rating = monster.challenge_rating;

      const condition_immunities = [];
      for (const immunity in monster.condition_immunities) {
        condition_immunities.push(monster.condition_immunities[immunity].name);
      }
      const damage_immunities = monster.damage_immunities;
      const damage_resistances = monster.damage_resistances;
      const damage_vulnerabilities = monster.damage_vulnerabilities;

      // special abilities is  horrible

      const xp = monster.xp;

      // return createMonster(
      //   name,
      //   type,
      //   size,
      //   armor_class,
      //   hit_points,
      //   hit_dice,
      //   speed,
      //   strength,
      //   dexterity,
      //   constitution,
      //   intelligence,
      //   wisdom,
      //   charisma,
      //   senses,
      //   languages,
      //   challenge_rating,
      //   condition_immunities,
      //   damage_immunities,
      //   damage_resistances,
      //   damage_vulnerabilities,
      //   xp
      // );
    });

    //This map returns an array of the promises returned by create monster

    await Promise.all(monsterPromises);

    console.log("Done creating monsters");

    //we need to close the connection to our db
    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createMonsterTable();
