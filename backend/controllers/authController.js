import jwt from "jsonwebtoken";
import data from "../models/user.js";
import argon2 from "argon2";
import "dotenv/config";

function generateToken(dataId) {
  return jwt.sign({ id: dataId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the detail." });
    }
    const ExistingUser = await data.findOne({ email });
    if (ExistingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2i,
    });
    const newStudent = new data({
      email,
      password: hashedPassword,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "User added", student: savedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await data.findOne({ email });

    if (!user || !user.password || !user.password.startsWith("$argon2")) {
      return res.status(400).json({ message: "Invalid email or Password" });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = generateToken(user._id);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err.message);
    next(err);
  }
}

// export async function getMe(req, res, next) {
//   try {
//     const user = await data.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "data not found" });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error("getMe Error:", err.message);
//     next(err);
//   }
// }

export const checkToken = (req, res) => {
  const { token } = req.cookies;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      user,
      decoded,
    });
  } catch {
    return res.status(401).json({
      message: "Invalid",
      error,
    });
  }
};
