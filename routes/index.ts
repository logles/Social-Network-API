import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// ... your other routes

// Catch-all for undefined routes
router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Route not found!");
});

export default router;
