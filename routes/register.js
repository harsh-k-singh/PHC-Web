const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Patient, validatePatient } = require("../models/Patient");

// @route   POST api/register
// @desc    Register a patient
// @access  Public
router.post("/", async (req, res) => {
  const {
    email,
    name,
    roll_number,
    phone,
    gender,
    birth,
    password,
    cnf_password,
    profession,
    guardian_relation,
    guardian_phone,
  } = req.body;

  // Validation of request body
  const form = {
    email,
    roll_number,
    name,
    phone,
    gender,
    birth,
    password,
    profession,
    guardian_relation,
    guardian_phone,
  };
  const { error } = validatePatient(form);
  if (error) return res.status(400).send(error.details[0].message);

  if (cnf_password != password)
    return res.status(400).send("Passwords do no match");
  if (
    profession === "Student" &&
    (guardian_relation === undefined || guardian_phone === undefined)
  )
    return res.status(400).send("Guardian details are not filled");

  try {
    // Check if user with same credentials already exist
    if ((await Patient.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");
    if ((await Patient.findOne({ roll_number })) !== null)
      return res.status(401).send("Roll number already exist");
    if ((await Patient.findOne({ phone })) !== null)
      return res.status(401).send("Phone number already exist");

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create a new patient and save it to the database
    let patient = new Patient({
      name,
      email,
      roll_number,
      phone,
      gender,
      birth,
      password: hashedPass,
      profession,
      guardian_relation,
      guardian_phone,
    });
    await patient.save();

    // Create a JWT token and send it to the client as a cookie
    const payload = {
      role: "patient",
      id: patient._id,
      name,
    };
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 60 * 60 * 24 * 14,
    });
    res.cookie("token", token);
    res.status(200).send("Registered");
  } catch (err) {
    // logs the error message to the console
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
