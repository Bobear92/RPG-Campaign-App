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

async function createItem(name, cost) {
  try {
    return client.query(
      `INSERT INTO equipment(name, cost)
          VALUES($1, $2)
          RETURNING *;`,
      []
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
      const name = item.name;
      const cost = [item.cost.quantity, item.cost.unit];
      console.log(cost);

      //   return createItem(name, cost);
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
