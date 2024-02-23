import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import Otp from "../models/otp";

const sendOtp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const otp = new Otp({
      name: name,
      email: email,
      password: hashPassword,
    });

    const token = await otp.generateToken();

    await otp.sendOtp();

    await otp.save().then(() => {
      res.status(200).json({
        message: "Otp Send successfully",
        userid: otp._id,
        name: name,
        email: email,
        token: token,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error Sending Otp" });
  }
};

const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        error: "User does not exists",
      });
    }

    const token = await existingUser.generateToken();

    const hashPassword = existingUser.password;

    const checkPassword = bcrypt.compareSync(password, hashPassword);

    if (checkPassword) {
      res.status(200).json({
        message: "User Logined successfully",
        userid: existingUser._id,
        name: existingUser.name,
        email: email,
        token: token,
      });
    } else {
      return res.status(400).json({
        error: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error Login User" });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  const verificationId = req.verificationId;
  const { otp } = req.body;
  try {
    if (!verificationId) {
      return res.status(400).json({ error: "Unable to verify your account" });
    }
    const tempUser = await Otp.findOne({ _id: verificationId });
    if (!tempUser) {
      return res.status(400).json({ error: "Unable to verify your account" });
    }

    if (otp === tempUser.otp) {
      const user = new User({
        email: tempUser.email,
        password: tempUser.password,
        name: tempUser.name,
      });

      const token = await user.generateToken();

      await user.save().then(async () => {
        await Otp.deleteMany({ email: user.email });
        return res.status(200).json({
          message: "User Registered Successfully",
          name: user.name,
          email: user.email,
          userid: user._id,
          token: token,
        });
      });
    } else {
      return res.status(400).json({
        error: "Incorrect otp",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error creating user",
    });
  }
};

export default {
  sendOtp,
  logIn,
  verifyOtp,
};
