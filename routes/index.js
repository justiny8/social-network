import express from "express";

export const router = express.Router();

import { router as userRoutes } from "./api/user-routes.js";
import { router as thoughtRoutes } from "./api/thought-routes.js";

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;