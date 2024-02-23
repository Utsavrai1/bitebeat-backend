import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import "./db/conn";
import morgan from "morgan";

// Routes Import

import myUserRoutes from "./routes/myUserRoutes";
import authRoutes from "./routes/AuthRoutes";

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", async (req: Request, res: Response) => {
  return res.json({ message: "Welcome to Bite Beat Backend" });
});

app.get("/health", async (req: Request, res: Response) => {
  return res.send({ message: "Health Ok!" });
});

app.use("/api/v1/my/user", myUserRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server rocking on http://localhost:${port}`);
});
