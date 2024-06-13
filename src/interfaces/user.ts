import { Document } from "mongoose";

export interface UserInterface extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  addressLine?: string;
  city?: string;
  country?: string;
  generateToken: () => Promise<string>;
}
