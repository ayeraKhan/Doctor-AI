import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    consentGiven: { type: Boolean, default: false },
    medicalHistory: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
