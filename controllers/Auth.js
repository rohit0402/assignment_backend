const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist login please" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    let newuser = await User.create({
      email: email,
      password: hashpassword,
      isAdmin: false,
    });
    await newuser.save();
    return res
      .status(200)
      .json({ success: true, message: "user created please login" });
  } catch (error) {
    return res.status(402).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Await the result of User.findOne
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Please signup first" });
    }

    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        isAdmin: user.isAdmin,
      });
  } catch (error) {
    return res.status(402).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  const reqId = req.id;
  try {
    let user = await User.findById(reqId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "please signup" });
    }

    res.status(200).json({ user, success: true, message: "user found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, logout, getUser };
