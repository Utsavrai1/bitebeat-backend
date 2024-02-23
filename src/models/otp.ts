import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { OtpInterface } from "../interfaces/otp";

const otpSchema = new mongoose.Schema({
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
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    expires: 120,
    default: Date.now,
  },
});

const secretKey = process.env.SECRET_KEY as string;

otpSchema.methods.generateToken = async function generateToken() {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, secretKey, {
      expiresIn: "1y",
    });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

otpSchema.methods.sendOtp = async function sendOtp() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const generatedOtp = Math.floor(100000 + Math.random() * 900000);

    this.otp = generatedOtp;

    const mailOptions = {
      from: process.env.EMAIL,
      to: this.email,
      subject: "Verify your email",
      html: "<p>Hii,</br> Your otp to verify your account is " + generatedOtp,
    };

    await this.save();

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Unable to send email");
      } else {
        console.log("Mail has been send:-", info.response);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

const Otp = mongoose.model<OtpInterface>("Otp", otpSchema);

export default Otp;
