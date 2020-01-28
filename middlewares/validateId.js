const db = require("../accounts/accounts-router");

async function validateId(req, res, next) {
  try {
    const account = await db("accounts")
      .where("id", req.params.id)
      .first();
    res.json(account);
  } catch (err) {
    next(`No account found with the id of ${req.params.id}`);
  }
}

module.exports = validateId;
