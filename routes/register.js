const express = require("express");
const { Patient, validatePatient } = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

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
    guarding_relation,
    guardian_phone,
  } = req.body;
  if (cnf_password != password)
    return res.status(400).send("Passwords do no match");
  if (profession !== "Student" && profession !== "Faculty")
    return res.status(400).send("Invalid profession");
  if (
    profession === "Student" &&
    (guarding_relation === undefined || guardian_phone === undefined)
  )
    return res.status(400).send("Guardian details are not filled");
  if (
    profession === "Faculty" &&
    (guarding_relation !== undefined || guardian_phone !== undefined)
  )
    return res.status(400).send("Guardian details are not required");

  const form = {
    email,
    name,
    roll_number,
    phone,
    gender,
    birth,
    password,
    profession,
    guarding_relation,
    guardian_phone,
  };
  const { error } = validatePatient(form);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    if ((await Patient.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");
    if ((await Patient.findOne({ roll_number })) !== null)
      return res.status(401).send("Roll number already exist");
    if ((await Patient.findOne({ phone })) !== null)
      return res.status(401).send("Phone number already exist");
    const hashedPass = await bcrypt.hash(password, 10);
    let patient = new Patient({
      name,
      email,
      roll_number,
      phone,
      gender,
      birth,
      password: hashedPass,
      profession,
      guarding_relation,
      guardian_phone,
    });
    await patient.save();
    const payload = {
      role: 4,
      id: patient._id,
      name,
    };
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 60 * 60 * 24 * 14,
    });
    res.cookie("token", token);
    res.status(200).send("Registered");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
