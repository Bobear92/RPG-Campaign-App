import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "https://rpg-campaign-app.herokuapp.com/api/"; // when deploying to heroku have this one running

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the monster url to use

// 5E api
export async function allMonsters() {
  try {
    const { data } = await axios.get(`${DnD}monsters`);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function eachMonster(url) {
  try {
    const { data } = await axios.get(`${DnDUrl}${url}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// my database
export async function getMyMonsters() {
  try {
    const { data } = await axios.get(`${BASE}monsters`);
    return data;
  } catch (error) {
    throw error;
  }
}
