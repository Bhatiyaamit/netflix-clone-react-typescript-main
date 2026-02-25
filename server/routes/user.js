const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  checkUserExists,
  verifyToken,
  googleLogin,
} = require("../Controller/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");

// POST Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/check-user", checkUserExists);
router.post("/verify-token", verifyToken);
router.post("/google-login", googleLogin);

module.exports = router;
