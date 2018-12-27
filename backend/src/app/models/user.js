import { Schema, model } from "mongoose";

const User = Schema(
  {
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  { collection: "Users" }
);

export default model("Users", User);
