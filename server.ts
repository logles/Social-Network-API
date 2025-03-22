import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import routes from "./routes";
import connection from "./config/connection";

const app: Application = express();
const PORT: number | string = process.env.PORT || 3001;
const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Social Network API");
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
