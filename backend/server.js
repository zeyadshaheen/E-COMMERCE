const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/Database.js");

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log("Error:" + err.message);
  console.log("Shutting down the server for Handling uncaught Exception");
});

//CONFIG
dotenv.config({
  path: "backend/config/.env",
});

//Connect Database
connectDatabase();

//CREATE SERVER
const server = app.listen(process.env.PORT, () => {
  console.log("Server is working on http://localhost:" + process.env.PORT);
});

//Unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log("Shutting down the server for " + err.message);
  console.log("Shutting down the server due to Unhandled promis rejection ");
  server.close(() => {
    process.exit(1);
  });
});
