const express = require("express");
const { model } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");

//create  a user using: POST "/api/auth/createuser". dosen't require Auth  // no login required
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
    if (user){
      return res.status(400).json({error:"sorry a user with this email already exists "})
    } 
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    // .then((user) => res.json(user))
    // .catch(err=> {console.log(err);
    //   res.json({error:'please enter a unique value for email', message: err.message})})
    // res.send(req.body);
    res.json(user)
  }
   catch (error) {
      console.error(error.message);
      res.status(500).send("some Error occured");  
      }

});  // ✅ closes router.post()
// Day 171 not done today sorry
// lect 48 complete hash
module.exports = router;
