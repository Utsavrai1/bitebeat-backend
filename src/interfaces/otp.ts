import { Document } from "mongoose";

export interface OtpInterface extends Document {
  email: string;
  password: string;
  name: string;
  addressLine?: string;
  city?: string;
  country?: string;
  otp?: string;
  generateToken: () => Promise<string>;
  sendOtp: () => Promise<string>;
}
