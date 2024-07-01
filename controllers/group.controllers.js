import Group from "../models/group.model.js";
import Message from "../models/message.model.js";

export const createGroup = async (req, res) => {
  try {
    const user = req.user._id
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
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sending group message", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const group = await Group.findById(groupId).populate("messages");

    res.status(200).json(group.messages);
  } catch (error) {
    console.log("Error in fetching group messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
