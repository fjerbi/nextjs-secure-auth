import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

// creating express app

const app = express();

// DB Connection
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Successfully connected to DB"))
  .catch((err) => console.log("DB Connection failed", err));

// apply middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("my Special middleware");
  next();
});

//routes
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
