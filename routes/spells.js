const express = require("express");
const spellsRouter = express.Router();
const { createSpell, getAllMySpells } = require("../db/spells");

spellsRouter.post("/", async (req, res, next) => {
  const {
    name,
    level,
    school,
    attack_type,
    damage_type,
    casting_time,
    range,
    concentration,
    components,
    materials,
    duration,
    ritual,
    classes,
    subclass,
    description,
    higher_levels,
    visible,
    gm_notes,
  } = req.body;

  if (
    !name ||
    !school ||
    !attack_type ||
    !damage_type ||
    !casting_time ||
    !range ||
    !components ||
    !materials ||
    !duration ||
    !classes ||
    !subclass ||
    !description ||
    !higher_levels ||
    !visible ||
    !gm_notes
  ) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields or initial api did not work",
    });
  } else {
    try {
      const spell = await createSpell(
        name,
        level,
        school,
        attack_type,
        damage_type,
        casting_time,
        range,
        concentration,
        components,
        materials,
        duration,
        ritual,
        classes,
        subclass,
        description,
        higher_levels,
        visible,
        gm_notes
      );
      if (spell) {
        res.send(spell);
      } else {
        next({
          name: "IncorrectCredentialsError",
          message:
            "One of your fields is fucked up man! or the api is fucked up",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
});

spellsRouter.get("/", async (req, res, next) => {
  try {
    const spells = await getAllMySpells();
    if (spells) {
      res.send(spells);
    } else {
      res.send({
        message:
          "No Spells found in my database either error getting or spells have yet to be populated",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = spellsRouter;
