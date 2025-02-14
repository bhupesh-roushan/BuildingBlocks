import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  password: String,
  role: { type: String, required: true, enum: ["instructor", "user"] },
});

export const User = mongoose.model("User", UserSchema);
