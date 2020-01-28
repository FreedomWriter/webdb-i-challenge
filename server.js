const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use(helmet());

server.use(morgan("dev"));

server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.send("<h3>webdb-i-challenge</h3>");
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong!" });
});

module.exports = server;
