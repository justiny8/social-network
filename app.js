import "./config/connection.js";
import mongoose from "mongoose";
const { connect, connection, Schema, model, Types } = mongoose;
import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";

import { User } from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", async (q, p) => {
  console.log("test..");
  const x = await User.find();
  p.send(x);
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});