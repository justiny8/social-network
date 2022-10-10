import { Thought } from "../../models/Thought.js";

import express from "express";
import { User } from "../../models/User.js";
export const router = express.Router();

router.get("/", async (req, res) => {
  const r = await Thought.find();
  let x = JSON.parse(JSON.stringify(r));
  let ret = x.map((e) => {
    delete e.id;
    return e;
  });
  res.json(ret);
});

router.get("/:thoughtId", async (req, res) => {
  try {
    const r = await Thought.findById(req.params.thoughtId);
    let x = JSON.parse(JSON.stringify(r));
    delete x.id;
    res.json(x);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.post("/", async (req, res) => {
  try {
    let x = new Thought(req.body);
    await x.save();
    await User.updateOne(
      { _id: req.body.userId },
      { $push: { thoughts: x._id } }
    );
    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.put("/:thoughtId", async (req, res) => {
  await Thought.updateOne({ _id: req.params.thoughtId }, { $set: req.body });
  let x = await Thought.findById(req.params.thoughtId);
  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});

router.delete("/:thoughtId", async (req, res) => {
  await Thought.deleteOne({ _id: req.params.thoughtId });
  const r = await Thought.find();
  let x = JSON.parse(JSON.stringify(r));
  let ret = x.map((e) => {
    delete e.id;
    return e;
  });
  res.json(ret);
});

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    await Thought.updateOne(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    );
    let x = await Thought.findById(req.params.thoughtId);
    let ret = JSON.parse(JSON.stringify(x));
    delete ret.id;
    res.json(ret);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong." });
  }
});

router.delete("/:thoughtId/reactions", async (req, res) => {
  await Thought.updateOne(
    { _id: req.params.thoughtId },
    { $pull: { reactions: req.body } }
  );
  let x = await Thought.findById(req.params.thoughtId);
  let ret = JSON.parse(JSON.stringify(x));
  delete ret.id;
  res.json(ret);
});