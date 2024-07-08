import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  editUserProfile,
  getUsersForGroupCreation,
  getUsersForSidebar,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/users", protectRoute, getUsersForGroupCreation);
router.put("/edit-profile", protectRoute, editUserProfile);

export default router;
