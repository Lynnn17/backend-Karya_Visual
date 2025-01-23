import express from "express";
import {
  createUserController,
  findUsersController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", findUsersController);
router.post("/add", createUserController);

export default router;
