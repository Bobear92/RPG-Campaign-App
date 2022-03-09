const express = require("express");
const feedbackRouter = express.Router();
const { createFeedback } = require("../db/feedback");

// post
feedbackRouter.post("/", async (req, res, next) => {
  const { name, feedback, gm } = req.body;
  if (!name || !feedback || !gm) {
    next({
      name: "MissingCredentialsError",
      message: "Please fill out all fields",
    });
  } else {
    try {
      const feedback = await createFeedback({ name, feedback, gm });
      if (feedback) {
        res.send(feedback);
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

module.exports = feedbackRouter;
