import express from "express";
import conDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
//CONFIGURING .ENV
dotenv.config();

conDB();

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "HELLO WORLD",
  });
});

//port configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});
//routes
