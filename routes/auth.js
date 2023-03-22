const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { Doctor } = require("../models/Doctor");
const { Patient } = require("../models/Patient");
const { Compounder } = require("../models/Compounder");
const { Admin } = require("../models/Admin");

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Selects the correct model based on the role
    const { role } = req.user;
    let Curr;
    if (role == "patient") Curr = Patient;
    else if (role == "doctor") Curr = Doctor;
    else if (role == "compounder") Curr = Compounder;
    else if (role == "admin") Curr = Admin;
    if (Curr === null) return res.status(500).send("No such role");

    // Finds the user and returns it
    const user = await Curr.findById(req.user.id).select("-password");
    return res.send(user);
  } catch (error) {
    // If there is an error, return it
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", async (req, res) => {
  const { email, password, role } = req.body;

  // Validate request body
  const { error } = Joi.object({
    role: Joi.string().valid("patient", "doctor", "compounder", "admin"),
    email: Joi.string().email().required(),
    password: Joi.string().max(30).required(),
  }).validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Selects the correct model based on the role
  let Curr;
  if (role == "patient") Curr = Patient;
  else if (role == "doctor") Curr = Doctor;
  else if (role == "compounder") Curr = Compounder;
  else if (role == "admin") Curr = Admin;
  if (Curr === null) return res.status(500).send("No such role");

  try {
    // Check if user exists
    const curr = await Curr.findOne({ email });

    // If user doesn't exist, return error
    if (!curr || !(await bcrypt.compare(password, curr.password)))
      return res.status(400).send("Invalid user name or password");

    // If user exists, create the payload and token
    const payload = {
      role: req.body.role,
      id: curr.id,
      name: curr.name,
    };
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 60 * 60 * 24 * 14,
    });

    // Send the token as a cookie
    res.cookie("token", token);
    res.send("Logged in");
  } catch (err) {
    // If there is an error, log it and return error
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   DELETE api/auth
// @desc    Logout user
// @access  Private
router.delete("/", auth, async (req, res) => {
  // Clear the cookie
  res.clearCookie("token");
  res.send("Logout");
});

module.exports = router;
