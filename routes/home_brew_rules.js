const express = require("express");
const homeRuleRouter = express.Router();
const {
  createRule,
  getAllMyRules,
  deleteRule,
  updateRuleVisibleStatus,
} = require("../db/home_brew_rules");

homeRuleRouter.post("/", async (req, res, next) => {
  const { name, description, visible, gm } = req.body;
  if (!name || !description || !visible || !gm) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields",
    });
  } else {
    try {
      const rule = await createRule({ name, description, visible, gm });
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

homeRuleRouter.delete("/:ruleId", async (req, res, next) => {
  const id = req.params.ruleId;

  if (!id) {
    next({
      name: "MissingCredentialsError",
      message: "Missing Id",
    });
  } else {
    try {
      const destroyed = await deleteRule(id);
    } catch (error) {
      next(error);
    }
  }
});

homeRuleRouter.patch("/", async (req, res, next) => {
  const { id, visible } = req.body;
  try {
    const updateVisible = await updateRuleVisibleStatus({
      id,
      visible,
    });
    res.send(updateVisible);
  } catch (error) {
    next({ name: "MissingFieldsError", message: "Id or visible status error" });
  }
});

module.exports = homeRuleRouter;
