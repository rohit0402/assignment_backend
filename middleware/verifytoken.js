const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  console.log('JWT_SECRET:', process.env.JWT_SECRET); 
  if (!token) {
    return res.status(401).json({ success: false, message: "access denied" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decodedToken.id;
    let user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "please signup" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { verifyToken };
