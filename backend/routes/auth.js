const express = require("express");
const { model } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");


const JWT_SECRET = "Ubedisagoodb$oy";

// ROUTE 1 : create  a user using: POST "/api/auth/createuser". dosen't require Auth  // no login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name ").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password at least 5 characters ").isLength({ min: 5 }),
  ],

  async (req, res) => {
    //if there are errors, return bad request and the errors
    // get and post issue solve krrrr IMPPPPPPPPPPPPPPPPPp solved ***
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wether the user with this email is exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists " });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      // .then((user) => res.json(user))
      // .catch(err=> {console.log(err);
      //   res.json({error:'please enter a unique value for email', message: err.message})})
      // res.send(req.body);

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      // res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
); // ✅ closes router.post()
// Day 171 not done today sorry
// lect 48 complete hash
// lect 49 half

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login". // no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async(req, res) => {
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user =  await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// ROUTE 3 : Get Loggedin user details: POST "/api/auth/getuser". //login required
router.post(
  "/getuser", fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});  // 🔹 proper closing

module.exports = router;
