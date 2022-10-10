import { User } from "../../models/User.js";

import express from "express";

export const router = express.Router();

router.get("/", async (req, res) => {
  // Get all users and call their "virtuals"
  res.json(JSON.parse(JSON.stringify(await User.find())));
});

router.get("/:userId", async (req, res) => {
  const r = await User.findById(req.params.userId)
    .populate("friends")
    .populate("thoughts");
  let x = JSON.parse(JSON.stringify(r));
  delete x.id;
  res.json(x);
});

router.post("/", async (req, res) => {
  try {
    let x = new User(req.body);
    await x.save();

    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    if (error.code == 11000) {
      res.json({ message: "Username is already in use." });
      return;
    }

    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.userId }, { $set: req.body });
    let x = await User.findById(req.params.userId);
    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    if (error.code == 11000) {
      res.json({ message: "Username is already in use." });
      return;
    }

    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    const r = await User.find();
    let x = JSON.parse(JSON.stringify(r));
    let ret = x.map((e) => {
      delete e.id;
      return e;
    });
    res.json(ret);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    );
    let x = await User.findById(req.params.userId);
    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    );
    let x = await User.findById(req.params.userId);
    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});