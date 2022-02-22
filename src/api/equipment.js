import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "/api/equipment"; // when deploying to heroku have this one running

const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDUrl = "https://www.dnd5eapi.co"; // when getting the equipment url to use

// 5E api
export async function allEquipment() {
  try {
    const { data } = await axios.get(`${DnD}equipment`);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function eachItem(url) {
  try {
    const { data } = await axios.get(`${DnDUrl}${url}`);
    return data;
  } catch (error) {
    throw error;
  }
}
