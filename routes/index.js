var express  = require('express'),
    passport = require('passport'),
    User     = require("../models/user"),
    router   = express.Router();

// ROOT ROUTE
router.get("/", (req, res) => {
    res.render("landing");
});

// ====================
// Auth Routes
// ====================

//Show register form
router.get("/register", function (req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success","Welcome To YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show Login Form
router.get("/login", function (req, res) {
    res.render("login");
});

//Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});

//logout route
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success","Logged You Out !!!");
    res.redirect("/campgrounds");
});

module.exports = router;