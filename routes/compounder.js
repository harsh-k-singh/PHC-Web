const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Compounder } = require("../models/Compounder");
const config = require("config");
const { Stock } = require("../models/Stock");
const { Medicine } = require("../models/Medicine");
const authCompounder = require("../middleware/authCompounder");
const bcrypt = require("bcryptjs");

router.post("/updateProfile", authCompounder, async (req, res) => {
  const validatecompounder = (compounder) => {
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
    return schema.validate(compounder);
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
  const { error } = validatecompounder(req.body);
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
    // create an api to upadte the profile of the compounder
    // the api should take the compounder id from the token
    // the api should take the updated details from the body
    // the api should update the details in the database
    // the api should return the updated details
    // the api should return the error if any
    // the api should return the error if the compounder is not found
    // the api should return the error if the compounder is not authorized

    const compounder = await Compounder.findById(req.user.id);
    if (!compounder) return res.status(404).send("Compounder not found");
    if (compounder.email !== email) {
      return res.status(400).send("Email cannot be changed");
    }
    if (new_password) {
      const validPassword = await bcrypt.compare(
        old_password,
        compounder.password
      );
      if (!validPassword) return res.status(400).send("Invalid password");
      const hashedPass = await bcrypt.hash(new_password, 10);
      compounder.password = hashedPass;
    }
    compounder.name = name;
    compounder.phone = phone;
    compounder.degree = degree;
    compounder.gender = gender;
    compounder.birth = birth;
    await compounder.save();
    res.status(200).send(compounder);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/updateSchedule", authCompounder, async (req, res) => {
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
    // create an api to update the schedule of the compounder
    // the api should take the compounder id from the token
    // the api should take the updated schedule from the body
    // the api should update the schedule in the database
    // the api should return the updated schedule
    // the api should return the error if any
    // the api should return the error if the compounder is not found
    // the api should return the error if the compounder is not authorized
    const compounder = await Compounder.findById(req.user.id);
    if (!compounder) return res.status(404).send("Compounder not found");
    compounder.timing = timing;
    await compounder.save();
    res.status(200).send(compounder);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/allMedicines", authCompounder, async (req, res) => {
  try {
    const medicines = await Medicine.find();
    let allMedicines = [];
    for (let i = 0; i < medicines.length; i++) {
      let medicine = medicines[i];
      let totalQuantity = 0;
      for (let j = 0; j < medicine.availableStock.length; j++) {
        let stock_id = medicine.availableStock[j];
        let stock = await Stock.findById(stock_id);
        const isExpired = (stock) => {
          if (new Date(stock.expiry) <= new Date()) return true;
          return false;
        };
        if (stock.quantity === 0 || isExpired(stock)) {
          medicine.deadStock.push(stock_id);
          medicine.availableStock.splice(j, 1);
          await medicine.save();
          j--;
          continue;
        }
        totalQuantity += stock.quantity;
      }
      allMedicines.push({ name: medicine.name, totalQuantity });
    }
    res.status(200).send(allMedicines);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
