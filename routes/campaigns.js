const express = require("express");
const campaignsRouter = express.Router();
const { createCampaign } = require("../db/campaigns");

// post
campaignsRouter.post("/", async (req, res, next) => {
  const { name, gm } = req.body;
  if (!name || !gm) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields",
    });
  } else {
    try {
      const campaign = await createCampaign({ name, gm });
      if (campaign) {
        res.send(campaign);
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "One of your fields is fucked up man!",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
});

module.exports = campaignsRouter;
