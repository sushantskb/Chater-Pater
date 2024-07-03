import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForGroupCreation,
  getUsersForSidebar,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/users", protectRoute, getUsersForGroupCreation);

export default router;
