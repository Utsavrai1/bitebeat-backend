import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces/user";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    addressLine: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "seller",
      required: true,
    },
  },
  { timestamps: true }
);

const secretKey = process.env.SECRET_KEY as string;

userSchema.methods.generateToken = async function generateToken() {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, secretKey, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
