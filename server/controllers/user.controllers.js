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

export const editUserProfile = async (req, res) => {
  const { fullName, username, profilePic, ...rest } = req.body;

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Update user fields
    if (fullName) user.name = fullName;
    if(username) user.username = username;
    if(profilePic) user.profilePic = profilePic

    Object.assign(user, rest);

    await user.save();
    const updatedUser = user._doc;
    return res.status(200).json({message: "User Updated", updatedUser})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}