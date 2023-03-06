const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Doctor } = require("../models/Doctor");
const config = require("config");
const authDoctor = require("../middleware/authDoctor");
const bcrypt = require("bcryptjs");

router.post("/updateProfile", authDoctor, async (req, res) => {
  const validatedoctor = (doctor) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.string().min(6).max(30),
      cnfNew_password: Joi.string(),
      phone: Joi.string().length(10),
      degree: Joi.string(),
      birth: Joi.date(),
      gender: Joi.string(),
    });
    return schema.validate(doctor);
  };

  const {
    name,
    email,
    old_password,
    new_password,
    phone,
    degree,
    gender,
    birth,
    cnfNew_password,
  } = req.body;
  const { error } = validatedoctor(req.body);
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
    // create an api to upadte the profile of the doctor
    // the api should take the doctor id from the token
    // the api should take the updated details from the body
    // the api should update the details in the database
    // the api should return the updated details
    // the api should return the error if any
    // the api should return the error if the doctor is not found
    // the api should return the error if the doctor is not authorized

    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    if (doctor.email !== email) {
      return res.status(400).send("Email cannot be changed");
    }
    if (new_password) {
      const validPassword = await bcrypt.compare(old_password, doctor.password);
      if (!validPassword) return res.status(400).send("Invalid password");
      const hashedPass = await bcrypt.hash(new_password, 10);
      doctor.password = hashedPass;
    }
    doctor.name = name;
    doctor.phone = phone;
    doctor.degree = degree;
    doctor.gender = gender;
    doctor.birth = birth;
    await doctor.save();
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/updateSchedule", authDoctor, async (req, res) => {
  const validateSchedule = (schedule) => {
    const schema = Joi.object({
      friAT: Joi.string().required(),
      friDT: Joi.string().required(),
      monAT: Joi.string().required(),
      monDT: Joi.string().required(),
      satAT: Joi.string().required(),
      satDT: Joi.string().required(),
      sunAT: Joi.string().required(),
      sunDT: Joi.string().required(),
      thuAT: Joi.string().required(),
      thuDT: Joi.string().required(),
      tueAT: Joi.string().required(),
      tueDT: Joi.string().required(),
      wedAT: Joi.string().required(),
      wedDT: Joi.string().required(),
    });
    return schema.validate(schedule);
  };

  const timing = req.body;
  const { error } = validateSchedule(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // create an api to update the schedule of the doctor
    // the api should take the doctor id from the token
    // the api should take the updated schedule from the body
    // the api should update the schedule in the database
    // the api should return the updated schedule
    // the api should return the error if any
    // the api should return the error if the doctor is not found
    // the api should return the error if the doctor is not authorized
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    doctor.timing = timing;
    await doctor.save();
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/updateAvailability", authDoctor, async (req, res) => {
  const validateSchedule = (schedule) => {
    const schema = Joi.object({
      availability: Joi.boolean().required(),
    });
    return schema.validate(schedule);
  };
  const { error } = validateSchedule(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // create an api to update the availability of the doctor
    // the api should take the doctor id from the token
    // the api should take the updated availability from the body
    // the api should update the availability in the database
    // the api should return the updated availability
    // the api should return the error if the doctor is not found
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).send("Doctor not found");
    doctor.availability = req.body.availability;
    await doctor.save();
    res.status(200).send(doctor);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
