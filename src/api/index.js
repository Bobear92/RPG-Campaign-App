import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "https://rpg-campaign-app.herokuapp.com/api/"; // when deploying to heroku have this one running

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

export async function getAllUsers() {
  try {
    const { data } = await axios.get(`${BASE}users/all`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function makeGM(id) {
  try {
    const { data } = await axios.patch(`${BASE}users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const { data } = await axios.delete(`${BASE}users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}
