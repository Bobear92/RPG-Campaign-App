import axios from "axios";

const BASE = "http://localhost:5000/api/"; // When in development have this one running
// const BASE = "https://rpg-campaign-app.herokuapp.com/api/"; // when deploying to heroku have this one running

export async function createCampaign({ name, gm }) {
  try {
    const { data } = await axios.post(`${BASE}campaigns`, {
      name,
      gm,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
