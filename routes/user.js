const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const WrapAsync = require("../utils/WrapAsync.js");
const usersController = require("../controllers/users.js");

// Render signup form
router
  .route("/signup")
  .get(usersController.renderSignupForm)
  .post(WrapAsync(usersController.signup));

// Render login form
router
  .route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersController.login
  );

// Logout
router.get("/logout", usersController.logout);

module.exports = router;