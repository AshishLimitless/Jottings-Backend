import express from "express";
import conDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
//CONFIGURING .ENV
dotenv.config();

conDB();

const app = express();

//general middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

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
