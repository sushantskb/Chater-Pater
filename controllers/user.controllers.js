import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in get user for slidebar", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForGroupCreation = async (req, res) => {
  try {
    const users = await User.find().select("_id username");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({error: "Internal server error"})
  }
};
