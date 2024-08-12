import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      username,
      fullName,
      password,
      profilePic,
      confirmPassword,
      gender,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      profilePic,
      password: hashedPassword,
      gender,
    });

    if (newUser) {
      // generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      const { password: _, ...filteredData } = newUser._doc;
      return res.status(201).json(filteredData);
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    const { password: _, ...filteredData } = user._doc;
    return res.status(200).json(filteredData);
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
