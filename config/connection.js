import mongoose from "mongoose";
const { connect, connection, Schema, model, Types } = mongoose;

const uri =
  "mongodb+srv://z:z@cluster0.fdntkkq.mongodb.net/?retryWrites=true&w=majority";

main().catch((err) => console.log(err));

async function main() {
  await connect(uri);
}

export const db = connection;

db.on("error", console.error.bind(console, "Error:"));

db.once("open", () => {
  console.log("DB Connection Successful!");
});