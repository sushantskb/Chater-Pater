import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../socket/socket.js";

export const createGroup = async (req, res) => {
  try {
    const user = req.user._id;
    const { name, members } = req.body;
    const newGroup = await Group.create({
      name,
      members: [user, ...members],
    });
    res.status(201).json(newGroup);
  } catch (error) {
    console.log("Error in creating group", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      members: req.user._id,
    });
    res.status(200).json(groups);
  } catch (error) {
    console.log("Error in fetching groups", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: groupId } = req.params;
    const senderId = req.user._id;
    const newMessage = await Message.create({
      senderId,
      groupId,
      message,
    });

    const group = await Group.findById(groupId);
    group.messages.push(newMessage._id);
    await group.save();

    // emit the messages to the group
    io.to(groupId).emit("receiverGroupMessages", newMessage);

    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sending group message", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const group = await Group.findById(groupId).populate({
      path: "messages",
      populate: {
        path: "senderId",
        select: "fullName",
      },
    });

    // console.log(group);

    const messages = group.messages.map((message) => ({
      message: message.message, 
      senderId: message.senderId._id, 
      fullName: message.senderId.fullName, 
      timestamp: message.createdAt,
    }));

    console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in fetching group messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const userId = req.user._id;

    // Find the group by ID
    const group = await Group.findById(groupId);

    // Check if the group exists
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if the user is a member of the group
    if (!group.members.includes(userId)) {
      return res.status(403).json({ error: "You are not authorized to delete this group" });
    }

    // Delete all messages associated with the group
    await Message.deleteMany({ groupId });

    // Delete the group
    await Group.findByIdAndDelete(groupId);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.log("Error in deleting group", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

