const express = require("express");
const equipmentRouter = express.Router();
const { getAllMyEquipment } = require("../db/equipment");

equipmentRouter.get("/", async (req, res, next) => {
  try {
    const equipment = await getAllMyEquipment();
    if (equipment) {
      res.send(equipment);
    } else {
      res.send({
        message:
          "No equipment found in my database either error getting or equipment have yet to be populated",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = equipmentRouter;
