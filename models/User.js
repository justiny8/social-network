import mongoose from "mongoose";
const { connect, connection, Schema, model, Types } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Username is required.",
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter valid email.",
      ],
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    virtuals: {
      friendCount: {
        get() {
          return this.friends.length;
        },
      },
    },
  }
);

userSchema.set("toJSON", { getters: false, virtuals: true, id: false });

export const User = model("User", userSchema);