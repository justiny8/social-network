import mongoose from "mongoose";
const { connect, connection, Schema, model, Types } = mongoose;
import { reactionSchema } from "./Reaction.js";

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (v) => new Date(v).toISOString(),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    virtuals: {
      reactionCount: {
        get() {
          return this.reactions.length;
        },
      },
    },
  }
);

export const Thought = model("Thought", thoughtSchema);