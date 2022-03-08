import axios from "axios";

// const BASE = "http://localhost:5000/api/"; // When in development have this one running
const BASE = "https://rpg-campaign-app.herokuapp.com/api/"; // when deploying to heroku have this one running

export async function createRule({ name, description, visible, gm }) {
  try {
    const { data } = await axios.post(`${BASE}home_brew_rules`, {
      name,
      description,
      visible,
      gm,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRule(id) {
  try {
    const { data } = axios.delete(`${BASE}home_brew_rules/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateRuleVisibleStatus(id, visible) {
  try {
    const { data } = await axios.patch(`${BASE}/home_brew_rules`, {
      id,
      visible,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMyRules() {
  try {
    const { data } = await axios.get(`${BASE}home_brew_rules`);
    return data;
  } catch (error) {
    throw error;
  }
}
