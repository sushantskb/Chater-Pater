import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.secretKey, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // Secure cookie in production
    sameSite: "None", // Required for cross-origin requests
  });
};

export default generateTokenAndSetCookie;
