import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "/api/"; // when deploying to heroku have this one running
const DnD = "https://www.dnd5eapi.co/api/"; // when pulling down from dnd database
const DnDSpellUrl = "https://www.dnd5eapi.co"; // when getting the spell url to use

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post(`${BASE}users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password, admin, gm) {
  try {
    const { data } = await axios.post(`${BASE}users/register`, {
      username,
      password,
      admin,
      gm,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username) {
  try {
    const { data } = await axios.post(`${BASE}users`, {
      username,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
