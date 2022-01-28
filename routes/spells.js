const express = require("express");
const spellsRouter = express.Router();
const { createSpell } = require("../db/spells");

spellsRouter.post("/", async (req, res, next) => {
  const {
    name,
    level,
    school,
    attackType,
    damageType,
    castingTime,
    range,
    concentration,
    components,
    materials,
    duration,
    ritual,
    classes,
    subclass,
    description,
    higherLevels,
    visible,
  } = req.body;
  if (
    !name ||
    !level ||
    !school ||
    !attackType ||
    !damageType ||
    !castingTime ||
    !range ||
    !concentration ||
    !components ||
    !materials ||
    !duration ||
    !ritual ||
    !classes ||
    !subclass ||
    !description ||
    !higherLevels ||
    !visible
  ) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields or initial api did not work",
    });
  }
  try {
    const spell = await createSpell(
      name,
      level,
      school,
      attackType,
      damageType,
      castingTime,
      range,
      concentration,
      components,
      materials,
      duration,
      ritual,
      classes,
      subclass,
      description,
      higherLevels,
      visible
    );
    if (spell) {
      res.send(spell);
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "One of your fields is fucked up man! or the api is fucked up",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = spellsRouter;
