import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createGroup,
  deleteGroup,
  getGroupMembers,
  getGroupMessages,
  getGroups,
  removeMember,
  sendGroupMessage,
} from "../controllers/group.controllers.js";

const router = express.Router();

router.post("/create-group", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.post("/send/:id", protectRoute, sendGroupMessage);
router.get("/messages/:id", protectRoute, getGroupMessages);
router.get("/members/:id", protectRoute, getGroupMembers);
router.delete("/delete-group/:id", protectRoute, deleteGroup);
router.delete("/remove-member/:groupId/:memberId", protectRoute, removeMember);

export default router;
