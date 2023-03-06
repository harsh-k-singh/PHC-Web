const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Doctor } = require("../models/Doctor");
const { Patient } = require("../models/Patient");
const {
  Prescription,
  validatePrescription,
} = require("../models/Prescription");
const { Stock } = require("../models/Stock");
const { Medicine } = require("../models/Medicine");
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

router.post("/addPrescription", authDoctor, async (req, res) => {
  const { patient, relation, symptoms, diagnosis, tests, remarks, medicines } =
    req.body;

  if (
    !patient ||
    !relation ||
    !symptoms ||
    !diagnosis ||
    !tests ||
    !Array.isArray(tests) ||
    !remarks ||
    !medicines ||
    !Array.isArray(medicines)
  )
    return res.status(400).send("Fields are not filled properly");
  const curr_patient = await Patient.findOne({ roll_number: patient });
  if (!curr_patient) return res.status(404).send("Patient not found");
  const patient_id = curr_patient._id;
  console.log(curr_patient, patient_id);

  let final_medicines = [];
  for (let i = 0; i < medicines.length; i++) {
    if (!medicines[i].name || !medicines[i].quantity || !medicines[i].dosage)
      return res.status(400).send("Medicine details are not filled properly");
    let medicine = await Medicine.findOne({ name: medicines[i].name });
    if (!medicine) return res.status(404).send("Medicine not found");
    let req_quantity = medicines[i].quantity;
    let final_medicine = {
      medicine_id: medicine._id,
      quantity: medicines[i].quantity,
      dosage: medicines[i].dosage,
      stocks: [],
    };
    // call the function to check if the medicine is available in sufficient quantity
    for (
      let j = 0;
      j < medicine.availableStock.length && req_quantity > 0;
      j++
    ) {
      console.log("medicine ch", medicine);
      let stock_id = medicine.availableStock[j];
      let stock = await Stock.findById(stock_id);
      if (stock.quantity === 0 || stock.expirtyDate < Date.now()) {
        console.log("inside 1st if ch");
        medicine.deadStock.push(stock_id);
        medicine.availableStock.splice(j, 1);
        await medicine.save();
        j--;
        continue;
      }
      if (stock.quantity >= req_quantity) {
        console.log("inside 2nd if ch");
        stock.quantity -= req_quantity;
        await stock.save();
        final_medicine.stocks.push({
          stock_id: stock._id,
          quantity: req_quantity,
        });
        break;
      } else {
        console.log("inside 3rd if ch");
        req_quantity -= stock.quantity;
        final_medicine.stocks.push({
          stock_id: stock._id,
          quantity: stock.quantity,
        });
        stock.quantity = 0;
        await stock.save();
        medicine.deadStock.push(stock_id);
        medicine.availableStock.splice(j, 1);
        await medicine.save();
        j--;
      }
    }
    console.log("fm", final_medicine);
    final_medicines.push(final_medicine);
  }
  const { error } = validatePrescription({
    patient_id,
    doctor_id: req.user.id,
    relation,
    symptoms,
    diagnosis,
    tests,
    remarks,
    medicines: final_medicines,
  });
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const prescription = new Prescription({
      patient_id: curr_patient._id,
      doctor_id: req.user.id,
      relation,
      symptoms,
      diagnosis,
      tests,
      remarks,
      medicines: final_medicines,
    });
    await prescription.save();
    curr_patient.prescriptions.push(prescription._id);
    await curr_patient.save();
    res.status(200).send(prescription);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
