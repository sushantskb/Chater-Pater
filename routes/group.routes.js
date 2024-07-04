import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createGroup,
  deleteGroup,
  getGroupMessages,
  getGroups,
  sendGroupMessage,
} from "../controllers/group.controllers.js";

const router = express.Router();

router.post("/create-group", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.post("/send/:id", protectRoute, sendGroupMessage);
router.get("/messages/:id", protectRoute, getGroupMessages);
router.delete("/delete-group/:id", protectRoute, deleteGroup);

export default router;
