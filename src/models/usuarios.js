import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    avatar: { type: String },
    birthdate: {
      type: Date,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
    },
    prefix: {
        type: String,
    },
    deleted: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Usuario", userSchema);
