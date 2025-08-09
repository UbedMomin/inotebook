const express = require("express");
const { model } = require("mongoose");
const User = require("../models/User");
const router = express.Router();

//create  a user using: POST "/api/auth/". dosen't require Auth
router.get("/", (req, res) => { // get and post issue solve krrrr IMPPPPPPPPPPPPPPPPPp
  console.log(req.body);
  const user = User(req.body);
  user.save()
  res.send(req.body);
});

module.exports = router;
