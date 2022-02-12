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
  abilityArray,
  spellCastingSpellArray,
  spellCastingDesc,
  spellCastingClass,
  spellCastingSlots,
  xp
) {
  try {
    return client.query(
      `INSERT INTO monsters(name, type, size, armor_class, hit_points, hit_dice, speed, strength, dexterity, constitution, intelligence, wisdom, charisma, senses, languages, challenge_rating, condition_immunities, damage_immunities, damage_resistances, damage_vulnerabilities, abilityArray, spellCastingSpellArray, spellCastingDesc, spellCastingClass, spellCastingSlots, xp)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
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
        abilityArray,
        spellCastingSpellArray,
        spellCastingDesc,
        spellCastingClass,
        spellCastingSlots,
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

    // test area

    const monsterPromises = monsterDescriptions.map((monster, indx) => {
      const name = monster.name; // string
      const type = monster.type; // string
      const size = monster.size; // string
      const armor_class = monster.armor_class; // integer
      const hit_points = monster.hit_points; // integer
      const hit_dice = monster.hit_dice; // string

      const speed = []; // array
      for (const speedType in monster.speed) {
        speed.push(`${speedType}: ${monster.speed[speedType]}`);
      }

      const strength = monster.strength; // integer
      const dexterity = monster.dexterity; // integer
      const constitution = monster.constitution; // integer
      const intelligence = monster.intelligence; // integer
      const wisdom = monster.wisdom; // integer
      const charisma = monster.charisma; // integer

      const senses = []; // array
      for (const sense in monster.senses) {
        senses.push(`${sense}: ${monster.senses[sense]}`);
      }

      // saving throws
      // skills

      const languages = monster.languages; // string
      const challenge_rating = monster.challenge_rating; // integer

      const condition_immunities = []; // array
      for (const immunity in monster.condition_immunities) {
        condition_immunities.push(monster.condition_immunities[immunity].name);
      }
      const damage_immunities = monster.damage_immunities; // array
      const damage_resistances = monster.damage_resistances; // array
      const damage_vulnerabilities = monster.damage_vulnerabilities; // array

      // actions

      // legendary actions

      const special_abilities_data = monster.special_abilities;

      const abilityArray = []; // array
      const spellCastingSpellArray = []; // array
      let spellCastingDesc = ""; // string
      let spellCastingClass = ""; // string
      const spellCastingSlots = []; // array

      special_abilities_data && special_abilities_data.length
        ? special_abilities_data.map((ability) => {
            if (ability.dc) {
              abilityArray.push(
                `${ability.name}: ${ability.desc} Saving throw: ${ability.dc.dc_type.name} - ${ability.dc.dc_value}`
              );
            } else if (ability.spellcasting) {
              ability.spellcasting.level
                ? (spellCastingDesc += `The ${name} is a ${
                    ability.spellcasting.level == 1
                      ? "1st"
                      : ability.spellcasting.level == 2
                      ? "2nd"
                      : ability.spellcasting.level == 3
                      ? "3rd"
                      : ability.spellcasting.level + "th"
                  }-level spellcaster. Its spellcasting ability is ${
                    ability.spellcasting.ability.name == "WIS"
                      ? "Wisdom"
                      : ability.spellcasting.ability.name == "INT"
                      ? "Intelligence"
                      : ability.spellcasting.ability.name == "CHA"
                      ? "Charisma"
                      : null
                  } (spell save DC ${ability.spellcasting.dc}, +${
                    ability.spellcasting.modifier
                  } to hit with spell attack)`)
                : (spellCastingDesc += `The ${name} is an innate spellcaster. Its spellcasting ability is ${
                    ability.spellcasting.ability.name == "WIS"
                      ? "Wisdom"
                      : ability.spellcasting.ability.name == "INT"
                      ? "Intelligence"
                      : ability.spellcasting.ability.name == "CHA"
                      ? "Charisma"
                      : null
                  } (spell save DC ${ability.spellcasting.dc}).`);
              ability.spellcasting.school
                ? (spellCastingClass += ability.spellcasting.school)
                : (spellCastingClass += "innate spellcaster");
              if (ability.spellcasting.slots) {
                for (const slot in ability.spellcasting.slots) {
                  spellCastingSlots.push(
                    `${
                      slot == 1
                        ? "1st level"
                        : slot == 2
                        ? "2nd level"
                        : slot == 3
                        ? "3rd level"
                        : slot + "th level"
                    } (${ability.spellcasting.slots[slot]} slots)`
                  );
                }
              } else if (spellCastingClass == "innate spellcaster") {
                spellCastingSlots.push("1 per day");
              }

              for (const spell in ability.spellcasting.spells) {
                spellCastingSpellArray.push([
                  ability.spellcasting.spells[spell].name,
                  ability.spellcasting.spells[spell].level,
                ]);
              }
            } else abilityArray.push(`${ability.name}: ${ability.desc}`);
          })
        : null;

      const xp = monster.xp; // integer

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
      //   abilityArray,
      //   spellCastingSpellArray,
      //   spellCastingDesc,
      //   spellCastingClass,
      //   spellCastingSlots,
      //   xp
      // );
    });

    //This map returns an array of the promises returned by create monster

    await Promise.all(monsterPromises);

    // console.log("Done creating monsters");

    //we need to close the connection to our db
    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createMonsterTable();
