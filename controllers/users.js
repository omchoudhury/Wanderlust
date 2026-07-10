const User = require("../models/user.js");
const  wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};


module.exports.signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);

    console.log(registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  } 
};


module.exports.renderLoginForm =  (req, res) => {
  res.render("users/login.ejs");
};


module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to Wanderlust!");
    res.redirect(res.locals.redirectUrl || "/listings");
  }

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
}