const axios = require("axios");
const { client } = require("../db");

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the url to use

async function eachItem(url) {
  try {
    return axios.get(`${DnDUrl}${url}`);
  } catch (error) {
    throw error;
  }
}

//a copy of createItem function from db/equipment.js, but returns the promise instead of awaiting the data
//this is so we aren't trying to use await inside of a map (which is not a good idea!)

async function createItem(
  name,
  description,
  cost,
  weight,
  item_type,
  gear_cat,
  weapon_cat,
  damage,
  two_handed_damage,
  range_type,
  range,
  properties,
  armor_cat,
  ac_base,
  ac_dex,
  ac_max_dex_bonus,
  stealth_dis,
  str_min,
  speed,
  carrying_capacity,
  visible,
  gm_notes
) {
  try {
    return client.query(
      `INSERT INTO equipment(name, description, cost, weight, item_type, gear_cat, weapon_cat, damage, two_handed_damage, range_type, range, properties, armor_cat, ac_base, 
        ac_dex, ac_max_dex_bonus, stealth_dis, str_min, speed, carrying_capacity, visible, gm_notes)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
          RETURNING *;`,
      [
        name,
        description,
        cost,
        weight,
        item_type,
        gear_cat,
        weapon_cat,
        damage,
        two_handed_damage,
        range_type,
        range,
        properties,
        armor_cat,
        ac_base,
        ac_dex,
        ac_max_dex_bonus,
        stealth_dis,
        str_min,
        speed,
        carrying_capacity,
        visible,
        gm_notes,
      ]
    );
  } catch (error) {
    throw error;
  }
}

const createEquipmentTable = async () => {
  try {
    await client.connect();
    const { data } = await axios.get(`${DnD}equipment`);

    const dataResults = data.results;
    const details = dataResults.map((equipment) => {
      const equipmentUrl = equipment.url;
      return equipmentUrl;
    });

    const equipmentDescriptionsResponse = await Promise.all(
      details.map((equipmentUrl) => {
        const equipment = eachItem(equipmentUrl);
        return equipment;
      })
    );

    const equipmentDescriptions = equipmentDescriptionsResponse.map(
      (d) => d.data
    ); //because we are returning a promise for the axios response for each item, we need to
    //map over the resolved responses and pull out the data. This gives us an array of the item objects

    const equipmentPromises = equipmentDescriptions.map((item, idx) => {
      const name = item.name; // string
      const description = [];
      item.desc && item.desc.length
        ? item.desc.map((desc) => {
            description.push(desc);
          })
        : null; // array
      const cost = [item.cost.quantity, item.cost.unit]; // array
      const weight = item.weight ? item.weight : null; // string instead
      const item_type = item.equipment_category.name; // string
      const gear_cat = item.gear_category ? item.gear_category.name : null; //string
      const weapon_cat = item.weapon_category ? item.weapon_category : null; // string
      const damage = item.damage
        ? [item.damage.damage_type.name, item.damage.damage_dice]
        : null; // array
      const two_handed_damage = item.two_handed_damage
        ? [
            item.two_handed_damage.damage_type.name,
            item.two_handed_damage.damage_dice,
          ]
        : null; // array
      const range_type = item.weapon_range ? item.weapon_range : null; //string
      const range = item.range ? [item.range.normal, item.range.long] : null; // array
      const properties = [];
      item.properties && item.properties.length
        ? item.properties.map((property) => {
            properties.push(property.name);
          })
        : null; // array

      const armor_cat = item.armor_category ? item.armor_category : null; // string

      const ac_base = item.armor_class ? item.armor_class.base : null; // number
      const ac_dex = item.armor_class
        ? item.armor_class.dex_bonus
          ? true
          : false
        : false; // boolean
      const ac_max_dex_bonus = ac_dex ? item.armor_class.max_bonus : null; // number

      const stealth_dis = item.stealth_disadvantage
        ? item.stealth_disadvantage
        : false; // boolean

      const str_min = item.str_minimum ? item.str_minimum : null;

      const speed = item.speed ? [item.speed.unit, item.speed.quantity] : null; // array
      const carrying_capacity = item.capacity ? item.capacity : null; // string
      const notes = "no equipment notes"; // string

      return createItem(
        name,
        description,
        cost,
        weight,
        item_type,
        gear_cat,
        weapon_cat,
        damage,
        two_handed_damage,
        range_type,
        range,
        properties,
        armor_cat,
        ac_base,
        ac_dex,
        ac_max_dex_bonus,
        stealth_dis,
        str_min,
        speed,
        carrying_capacity,
        true,
        notes
      );

      // console.log(name, str_min);
    });

    await Promise.all(equipmentPromises);

    console.log("Done creating equipment");

    //we need to close the connection to our db
    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createEquipmentTable();
