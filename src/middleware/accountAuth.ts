import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Otp from "../models/otp";

declare global {
  namespace Express {
    interface Request {
      verificationId: string;
    }
  }
}

export const jwtParseVerifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    console.log(decoded);
    const verificationId = decoded._id;
    const user = await Otp.findOne({ _id: verificationId });

    if (!user) {
      return res.sendStatus(401);
    }

    req.verificationId = user._id.toString();
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
