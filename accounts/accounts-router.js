const express = require("express");

const db = require("../data/dbConfig");

const validator = require("../middlewares/validator");
const validateID = require("../middlewares/validateId");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await db("accounts"));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateID, async (req, res, next) => {
  try {
    const account = await db("accounts")
      .where("id", req.params.id)
      .first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  validator("name"),
  validator("budget"),
  async (req, res, next) => {
    try {
      const payload = {
        name: req.body.name,
        budget: req.body.budget
      };
      const [id] = await db("accounts").insert(payload);
      res.json(
        await db("accounts")
          .where("id", id)
          .first()
      );
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id", validateID, async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    await db("accounts")
      .where("id", req.params.id)
      .update(payload);
    res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateID, async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
