const axios = require("axios");
const { client } = require("../db");

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the url to use

async function eachFeature(url) {
  try {
    return axios.get(`${DnDUrl}${url}`);
  } catch (error) {
    throw error;
  }
}

//a copy of createFeature function from db/feature.js, but returns the promise instead of awaiting the data
//this is so we aren't trying to use await inside of a map (which is not a good idea!)

const createFeatureTable = async () => {
  try {
    await client.connect();
    const { data } = await axios.get(`${DnD}features`);

    const dataResults = data.results;
    const details = dataResults.map((feature) => {
      const featureUrl = feature.url;
      return featureUrl;
    });

    const featuresDescriptionsResponse = await Promise.all(
      details.map((featureUrl) => {
        const feature = eachFeature(featureUrl);
        return feature;
      })
    );

    const featuresDescriptions = featuresDescriptionsResponse.map(
      (d) => d.data
    ); //because we are returning a promise for the axios response for each feature, we need to
    //map over the resolved responses and pull out the data. This gives us an array of the feature objects

    const featuresPromises = featuresDescriptions.map((feature, idx) => {
      const name = feature.index; // string
      const level = feature.level; //number
      const dnd_class = feature.class.name; // string
      const description = [];
      feature.desc && feature.desc.length
        ? feature.desc.map((desc) => {
            description.push(desc);
          })
        : null; // text array

      const sub_class = feature.subclass ? feature.subclass.name : null; // string

      const feature_options = [];

      feature.feature_specific
        ? feature_options.push(
            `Choose: ${feature.feature_specific.subfeature_options.choose} of the following`
          )
        : null;

      console.log(name, ": ", feature_options);
    });

    await Promise.all(featuresPromises);

    console.log("Done creating Features");

    //we need to close the connection to our db
    await client.end();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createFeatureTable();
