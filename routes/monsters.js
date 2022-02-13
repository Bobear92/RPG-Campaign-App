const express = require("express");
const monstersRouter = express.Router();
const { getAllMyMonsters } = require("../db/monsters");

monstersRouter.get("/", async (req, res, next) => {
  try {
    const monsters = await getAllMyMonsters();
    if (monsters) {
      res.send(monsters);
    } else {
      res.send({
        message:
          "No monsters found in my database either error getting or monsters have yet to be populated",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = monstersRouter;
