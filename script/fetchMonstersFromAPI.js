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
  saving_throws,
  skills,
  languages,
  challenge_rating,
  condition_immunities,
  damage_immunities,
  damage_resistances,
  damage_vulnerabilities,
  actions,
  legendary_actions,
  ability_array,
  spell_casting_spell_array,
  spell_casting_desc,
  spell_casting_class,
  spell_casting_slots,
  xp,
  visible,
  gm_notes
) {
  try {
    return client.query(
      `INSERT INTO monsters(name, type, size, armor_class, hit_points, hit_dice, speed, strength, dexterity, constitution, intelligence, wisdom, charisma, senses, saving_throws, skills, languages, challenge_rating, condition_immunities, damage_immunities, damage_resistances, damage_vulnerabilities, actions, legendary_actions, ability_array, spell_casting_spell_array, spell_casting_desc, spell_casting_class, spell_casting_slots, xp, visible, gm_notes)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32)
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
        saving_throws,
        skills,
        languages,
        challenge_rating,
        condition_immunities,
        damage_immunities,
        damage_resistances,
        damage_vulnerabilities,
        actions,
        legendary_actions,
        ability_array,
        spell_casting_spell_array,
        spell_casting_desc,
        spell_casting_class,
        spell_casting_slots,
        xp,
        visible,
        gm_notes,
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

      const proficiency_data = monster.proficiencies;
      const saving_throws = []; // array
      const skills = []; // array

      proficiency_data.map((data) => {
        data.proficiency.name.startsWith("Saving")
          ? saving_throws.push([data.proficiency.name, data.value])
          : skills.push([data.proficiency.name, data.value]);
      });

      const languages = monster.languages; // string
      let challenge_rating = ""; // string

      monster.challenge_rating == 0.125
        ? (challenge_rating += "1/8")
        : monster.challenge_rating == 0.25
        ? (challenge_rating += "1/4")
        : monster.challenge_rating == 0.5
        ? (challenge_rating += "1/2")
        : (challenge_rating += `${monster.challenge_rating}`);

      const condition_immunities = []; // array
      for (const immunity in monster.condition_immunities) {
        condition_immunities.push(monster.condition_immunities[immunity].name);
      }
      const damage_immunities = monster.damage_immunities; // array
      const damage_resistances = monster.damage_resistances; // array
      const damage_vulnerabilities = monster.damage_vulnerabilities; // array

      const action_data = monster.actions;

      const actions = [];

      action_data && action_data.length
        ? action_data.map((action) => {
            if (action.usage) {
              actions.push([
                `${action.name}: ${action.desc}`,
                action.usage.dice
                  ? `${action.usage.type} ${action.usage.dice} min: ${action.usage.min_value} `
                  : `${action.usage.times} ${action.usage.type}`,
              ]);
            } else
              actions.push([
                `${action.name}: ${action.desc}`,
                "no usage specified",
              ]);
          })
        : actions.push("no actions");

      const legendary_data = monster.legendary_actions;

      const legendary_actions = []; // array

      legendary_data && legendary_data.length
        ? legendary_data.map((data) => {
            legendary_actions.push(`${data.name}: ${data.desc}`);
          })
        : legendary_actions.push("no legendary actions");

      const special_abilities_data = monster.special_abilities;

      const ability_array = []; // array
      const spell_casting_spell_array = []; // array
      let spell_casting_desc = ""; // string
      let spell_casting_class = ""; // string
      const spell_casting_slots = []; // array

      special_abilities_data && special_abilities_data.length
        ? special_abilities_data.map((ability) => {
            if (ability.dc) {
              ability_array.push(
                `${ability.name}: ${ability.desc} Saving throw: ${ability.dc.dc_type.name} - ${ability.dc.dc_value}`
              );
            } else if (ability.spellcasting) {
              ability.spellcasting.level
                ? (spell_casting_desc += `The ${name} is a ${
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
                : (spell_casting_desc += `The ${name} is an innate spellcaster. Its spellcasting ability is ${
                    ability.spellcasting.ability.name == "WIS"
                      ? "Wisdom"
                      : ability.spellcasting.ability.name == "INT"
                      ? "Intelligence"
                      : ability.spellcasting.ability.name == "CHA"
                      ? "Charisma"
                      : null
                  } (spell save DC ${ability.spellcasting.dc}).`);
              ability.spellcasting.school
                ? (spell_casting_class += ability.spellcasting.school)
                : (spell_casting_class += "innate spellcaster");
              if (ability.spellcasting.slots) {
                for (const slot in ability.spellcasting.slots) {
                  spell_casting_slots.push(
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
              } else if (spell_casting_class == "innate spellcaster") {
                spell_casting_slots.push("1 per day");
              }

              for (const spell in ability.spellcasting.spells) {
                spell_casting_spell_array.push([
                  ability.spellcasting.spells[spell].name,
                  ability.spellcasting.spells[spell].level,
                ]);
              }
            } else ability_array.push(`${ability.name}: ${ability.desc}`);
          })
        : null;

      const xp = monster.xp; // integer
      const notes = "no monster notes"; // string

      return createMonster(
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
        saving_throws,
        skills,
        languages,
        challenge_rating,
        condition_immunities,
        damage_immunities,
        damage_resistances,
        damage_vulnerabilities,
        actions,
        legendary_actions,
        ability_array,
        spell_casting_spell_array,
        spell_casting_desc,
        spell_casting_class,
        spell_casting_slots,
        xp,
        true,
        notes
      );
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
