import express from "express";
import { findUsersController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", findUsersController);

export default router;
