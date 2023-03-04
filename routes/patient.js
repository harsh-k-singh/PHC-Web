const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Patient } = require("../models/Patient");
const config = require("config");
const middleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.post("/updateProfile", middleware, async (req, res) => {
  const validatepatient = (patient) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      roll_number: Joi.string().required(),
      old_password: Joi.string(),
      new_password: Joi.string().min(6).max(30),
      cnfNew_password: Joi.string(),
      phone: Joi.string().length(10),
      birth: Joi.date(),
      gender: Joi.string(),
    });
    return schema.validate(patient);
  };

  const {
    name,
    email,
    roll_number,
    old_password,
    new_password,
    phone,
    gender,
    birth,
    cnfNew_password,
  } = req.body;
  const { error } = validatepatient(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    (old_password != undefined &&
      (new_password === undefined || cnfNew_password === undefined)) ||
    (new_password != undefined && cnfNew_password === undefined) ||
    (new_password === undefined && cnfNew_password != undefined)
  )
    return res.status(400).send("Password fields are not filled properly");
  if (new_password != undefined && old_password === new_password)
    return res.status(400).send("New password and old password are same");
  if (cnfNew_password != undefined && new_password != cnfNew_password)
    return res
      .status(400)
      .send("New password and confirm password are not same");
  try {
    // create an api to upadte the profile of the patient
    // the api should take the patient id from the token
    // the api should take the updated details from the body
    // the api should update the details in the database
    // the api should return the updated details
    // the api should return the error if any
    // the api should return the error if the patient is not found
    // the api should return the error if the patient is not authorized

    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).send("patient not found");
    if (patient.email !== email) {
      return res.status(400).send("Email cannot be changed");
    }
    if (patient.roll_number !== roll_number) {
      return res.status(400).send("Roll number cannot be changed");
    }
    if (new_password) {
      const validPassword = await bcrypt.compare(
        old_password,
        patient.password
      );
      if (!validPassword) return res.status(400).send("Invalid password");
      const hashedPass = await bcrypt.hash(new_password, 10);
      patient.password = hashedPass;
    }
    patient.name = name;
    patient.phone = phone;
    patient.gender = gender;
    patient.birth = birth;
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
