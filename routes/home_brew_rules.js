const express = require("express");
const homeRuleRouter = express.Router();
const { createRule, getAllMyRules } = require("../db/home_brew_rules");

homeRuleRouter.post("/", async (req, res, next) => {
  const { name, description, gm } = req.body;
  console.log(name, "name", description, "description", gm, "gm");
  if (!name || !description || !gm) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields",
    });
  } else {
    try {
      const rule = await createRule({ name, description, gm });
      if (rule) {
        res.send(rule);
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

homeRuleRouter.get("/", async (req, res, next) => {
  try {
    const rules = await getAllMyRules();
    if (rules) {
      res.send(rules);
    } else {
      res.send({
        message: "No rules found in my database.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = homeRuleRouter;
