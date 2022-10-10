import mongoose from "mongoose";
const { connect, connection, Schema, model, Types } = mongoose;

export const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now(),

      get: (v) => new Date(v).toISOString(),
    },
  },
  {}
);