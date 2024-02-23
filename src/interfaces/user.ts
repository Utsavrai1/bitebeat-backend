import { Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  name: string;
  addressLine?: string;
  city?: string;
  country?: string;
  generateToken: () => Promise<string>;
}
