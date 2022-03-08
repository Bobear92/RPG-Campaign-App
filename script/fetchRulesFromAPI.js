const axios = require("axios");
const { client } = require("../db");

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the url to use

async function eachRuleCategory(url) {
  try {
    const { data } = await axios.get(`${DnDUrl}${url}`);
    return data.subsections;
  } catch (error) {
    throw error;
  }
}

async function eachRule(url) {
  try {
    const { data } = await axios.get(`${DnDUrl}${url}`);
    return data;
  } catch (error) {
    throw error;
  }
}

//a copy of createRule function from db/official_rules.js, but returns the promise instead of awaiting the data
//this is so we aren't trying to use await inside of a map (which is not a good idea!)

async function createRule(name, description) {
  try {
    return client.query(
      `INSERT INTO rule_descriptions(name, description)
            VALUES($1, $2)
            RETURNING *;`,
      [name, description]
    );
  } catch (error) {
    throw error;
  }
}

const createRuleTable = async () => {
  try {
    await client.connect();

    const { data } = await axios.get(`${DnD}rules`);

    const dataResults = data.results;
    const details = dataResults.map((firstData) => {
      const firstDataUrl = firstData.url;
      return firstDataUrl;
    });

    const ruleDescriptionsResponse = await Promise.all(
      details.map((ruleUrl) => {
        const ruleCat = eachRuleCategory(ruleUrl);
        return ruleCat;
      })
    );

    const masterArray = [];
    const finalUrl = ruleDescriptionsResponse.map((data) => {
      return data.map((innerData) => {
        const finalUrl = innerData.url;
        masterArray.push(finalUrl);
      });
    });

    const finalDescriptionResponse = await Promise.all(
      masterArray.map((lastUrl) => {
        const finalData = eachRule(lastUrl);
        return finalData;
      })
    );

    const finalDescriptions = finalDescriptionResponse.map((d) => d); //because we are returning a promise for the axios response for each rule, we need to
    //map over the resolved responses and pull out the data. This gives us an array of the rule objects

    const rulePromises = finalDescriptions.map((rule, idx) => {
      const name = rule.name;
      const description = rule.desc;

      return createRule(name, description);
    });

    await Promise.all(rulePromises);

    console.log("Done creating rules");

    //we need to close the connection to our db

    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createRuleTable();
