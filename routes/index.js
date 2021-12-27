var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "My Facebook" });
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

//Data Manipulation Routes
router.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  // console.log(user);
  user
    .save()
    .then(() => {
      console.log("Data Saved");
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/login", (req, res) => {
  const UserName = req.body.username;
  const Password = req.body.password;
  if (UserName == "" || Password == "") {
    res.send({
      message: "Inputs Required",
    });
    return false;
  }
  User.findOne({ username: UserName }, (error, foundResult) => {
    if (error) {
      console.log(error);
    } else {
      if (foundResult.password === Password) {
        res.redirect("/profile");
      } else {
        res.send({ message: "Incorrect UserName or Password" });
      }
    }
  });
});

module.exports = router;
