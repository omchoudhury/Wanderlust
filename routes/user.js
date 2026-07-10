const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapasync = require("../utils/wrapasync.js");

const usersController = require("../controllers/users.js");

//render signup form
router.route("/signup")
.get(usersController.renderSignupForm)
.post(wrapasync(usersController.signup));


//render login form and login post requests
router.route("/login")
.get( usersController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
     usersController.login
);

router.get("/logout", usersController.logout);

module.exports = router;

