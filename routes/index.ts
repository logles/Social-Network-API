import { Router, Request, Response, NextFunction } from "express";
import userRoutes from "./api/userRoutes";
import thoughtRoutes from "./api/thoughtRoutes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Social Network API");
});

router.use("/api/users", userRoutes);
router.use("/api/thoughts", thoughtRoutes);

router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Route not found!");
});

export default router;
