const express = require("express");
const officialRuleRouter = express.Router();

const { getAllOfficialRules } = require("../db/official_rules");

officialRuleRouter.get("/", async (req, res, next) => {
  try {
    const rules = await getAllOfficialRules();
    if (rules) {
      res.send(rules);
    } else {
      res.send({
        message:
          "No rules found in my database may not have been populated yet.",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = officialRuleRouter;
