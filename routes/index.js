const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/users");

apiRouter.get("/health", async (req, res, next) => {
  try {
    res.send({
      message: "Healthy",
    });
  } catch (error) {
    next(error);
  }
});

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return next();
  }

  if (auth.startsWith("Bearer ")) {
    const token = auth.slice("Bearer ".length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({ name: "AuthError", message: "Error in authorization format" });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }
  next();
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const spellsRouter = require("./spells");
apiRouter.use("/spells", spellsRouter);

const monstersRouter = require("./monsters");
apiRouter.use("/monsters", monstersRouter);

const equipmentRouter = require("./equipment");
apiRouter.use("/equipment", equipmentRouter);

const homeRuleRouter = require("./home_brew_rules");
apiRouter.use("/home_brew_rules", homeRuleRouter);

const officialRuleRouter = require("./official_rules");
apiRouter.use("/official_rules", officialRuleRouter);

const feedbackRouter = require("./feedback");
apiRouter.use("/feedback", feedbackRouter);

const campaignsRouter = require("./campaigns");
apiRouter.use("/campaigns", campaignsRouter);

module.exports = apiRouter;
