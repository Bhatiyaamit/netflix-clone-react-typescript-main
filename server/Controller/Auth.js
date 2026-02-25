const bcrypt = require("bcrypt");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Sign up route handler
exports.signup = async (req, res) => {
  try {
    // get data
    const { name, email, password, role } = req.body;

    // check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Secured password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // Create Entry for User
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be register,Please try again later",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    // check for register user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Verify password & generate a JWT token

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // Remove password from user object before sending response
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      // password not match
      return res.status(403).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Login false",
    });
  }
};

// Check if user exists by email
exports.checkUserExists = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        success: true,
        exists: true,
        message: "User exists",
      });
    } else {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "User does not exist",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error checking user",
    });
  }
};

// Verify JWT token
exports.verifyToken = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        valid: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
      message: "Token is valid",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      valid: false,
      message: "Invalid token",
    });
  }
};

// Google OAuth login
exports.googleLogin = async (req, res) => {
  try {
    const { email, name, picture, googleId } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
      });
    }

    // Find existing user or create a new one
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: googleId || null,
        picture: picture || null,
        role: "Visitor",
      });
    } else {
      // Update google fields if they were missing
      if (googleId && !user.googleId) user.googleId = googleId;
      if (picture) user.picture = picture;
      await user.save();
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const userObj = user.toObject();
    userObj.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: userObj,
      message: "Google login successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};
