const express = require("express");
const { model } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");

//create  a user using: POST "/api/auth/". dosen't require Auth
router.post(
  "/",
  [
    body("name", "enter a valid name ").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password at least 5 characters ").isLength({ min: 5 }),
  ],

  (req, res) => {
    // get and post issue solve krrrr IMPPPPPPPPPPPPPPPPPp
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    }).then((user) => res.json(user))
    .catch(err=> {console.log(err);
      res.json({error:'please enter a unique value for email', message: err.message})})
    // res.send(req.body);
  }
);

module.exports = router;
