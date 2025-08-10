const express = require("express");
const { model } = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");

//create  a user using: POST "/api/auth/". dosen't require Auth
router.post(
  "/",
  [body("name").isLength({min: 3}),
     body("email").isEmail()],
  (req, res) => {
    // get and post issue solve krrrr IMPPPPPPPPPPPPPPPPPp
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    const errors = validationResult(req)
    if (!errors.isEmpty()){
      return res.this.status(400).json({errors: errors.array()})
    }
    res.send(req.body);
  }
);

module.exports = router;
