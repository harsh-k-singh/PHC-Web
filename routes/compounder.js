const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Compounder } = require("../models/Compounder");
const { Doctor } = require("../models/Doctor");
const { Patient } = require("../models/Patient");
const { Relative } = require("../models/Relative");
const {
  Prescription,
  validatePrescription,
} = require("../models/Prescription");
const { Stock } = require("../models/Stock");
const { Medicine } = require("../models/Medicine");
const authCompounder = require("../middleware/authCompounder");
const bcrypt = require("bcryptjs");

// function to check if stock is expired
const isExpired = (stock) => {
  if (new Date(stock.expiry) <= new Date()) return true;
  return false;
};

// @route GET api/compounder/getMedicine
// @desc Get Medicine
// @access Private
router.get("/getMedicine", authCompounder, async (req, res) => {
  try {
    // check if any stock expired and substract quantity from medicine
    const stocks = await Stock.find();
    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];
      if (!stock.expired && isExpired(stock)) {
        stock.expired = true;

        // substract quantity from medicine
        const medicine = await Medicine.findById(stock.medicine_id);
        medicine.quantity -= stock.quantity;
        await medicine.save();

        await stock.save();
      }
    }

    const medicines = await Medicine.find();
    res.status(200).send(medicines);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route POST api/compounder/updateProfile
// @desc Update Compounder Profile
// @access Private
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

// @route GET api/compounder/updateSchedule
// @desc Update Compounder Schedule
// @access Private
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

// @route GET api/compounder/patientExists
// @desc Check if patient exists
// @access Private
router.get("/patientExists", authCompounder, async (req, res) => {
  const { roll_number } = req.query;
  if (!roll_number) return res.status(400).send("Roll number not provided");
  try {
    const patient = await Patient.findOne({ roll_number });
    if (!patient)
      return res
        .status(404)
        .send("No such patient exists with this roll number");
    res.status(200).send("Patient exists");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route GET api/compounder/getRelative
// @desc Get relative of a patient
// @access Private
router.get("/getRelative", authCompounder, async (req, res) => {
  const { roll_number } = req.query;
  if (!roll_number) return res.status(400).send("Roll number not provided");
  try {
    const patient = await Patient.findOne({ roll_number });
    if (!patient)
      return res.status(404).send("No patient found with this roll number");
    const relative = patient.relative;
    const ent = {
      relative_id: patient._id,
      name: patient.name,
      relation: "self",
    };
    relative.unshift(ent);
    res.status(200).send(relative);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route POST api/compounder/addPrescription
// @desc Add prescription to a patient
// @access Private
router.post("/addPrescription", authCompounder, async (req, res) => {
  const { patient, id, symptoms, diagnosis, tests, remarks, medicines } =
    req.body;

  if (
    patient == null ||
    id == null ||
    symptoms == null ||
    diagnosis == null ||
    tests == null ||
    remarks == null ||
    medicines == null ||
    !Array.isArray(tests) ||
    !Array.isArray(medicines)
  )
    return res.status(400).send("Fields are not filled properly");
  const source = await Patient.findOne({ roll_number: patient });
  if (!source) return res.status(404).send("Patient not found");
  const patient_id = id;

  for (let i = 0; i < medicines.length; i++) {
    // check if the medicine details are filled properly
    if (
      !medicines[i].medicine_id ||
      !medicines[i].quantity ||
      !medicines[i].dosage
    )
      return res.status(400).send("Medicine details are not filled properly");

    // find the medicine in the database
    let medicine = await Medicine.findById(medicines[i].medicine_id);
    if (!medicine) return res.status(404).send("Medicine not found");
    let req_quantity = medicines[i].quantity;

    // check if the medicine is available in sufficient quantity
    if (medicine.quantity < req_quantity)
      return res
        .status(400)
        .send(`${medicine.name} not available in sufficient quantity`);

    // find the stocks from the available stocks of the medicine
    const stocks = await Stock.find({ medicine_id: medicine._id });
    stocks.sort((a, b) => a.date - b.date);
    for (let j = 0; j < stocks.length && req_quantity > 0; j++) {
      let stock = stocks[j];

      if (stock.quantity === 0 || isExpired(stock)) continue;

      if (stock.quantity >= req_quantity) {
        stock.quantity -= req_quantity;
        medicine.quantity -= req_quantity;
        await stock.save();
        await medicine.save();
        break;
      } else {
        req_quantity -= stock.quantity;
        medicine.quantity -= stock.quantity;
        stock.quantity = 0;
        await stock.save();
        await medicine.save();
      }
    }
  }

  const form = {
    source_id: source._id,
    patient_id,
    compounder_id: req.user.id,
    symptoms,
    diagnosis,
    tests,
    remarks,
    medicines,
  };
  // validate the prescription
  const { error } = validatePrescription(form);
  if (error) return res.status(400).send(error.details[0].message);

  // save the prescription in the database
  try {
    const prescription = new Prescription(form);
    await prescription.save();

    // save the prescription in the patient's prescriptions array
    if (source._id == patient_id) {
      source.prescriptions.push(prescription._id);
      await source.save();
    } else {
      let rel = await Relative.findById(patient_id);
      rel.prescriptions.push(prescription._id);
      await rel.save();
    }

    // save the prescription in the compounder's prescriptions array
    await Compounder.findByIdAndUpdate(req.user.id, {
      $push: { prescriptions: prescription._id },
    });

    // send the prescription to the patient
    res.status(200).send(prescription);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route GET api/compounder/getPrescription
// @desc Get prescription of a patient
// @access Private
router.get("/getPrescription", authCompounder, async (req, res) => {
  try {
    let prescriptions = await Prescription.find({
      compounder_id: req.user.id,
    });

    let pre = [];
    for (let i = 0; i < prescriptions.length; i++) {
      let prescription = prescriptions[i];
      let { source_id, patient_id, symptoms, diagnosis, tests, remarks, date } =
        prescription;
      let source = await Patient.findById(source_id);
      let source_roll_number = source.roll_number;
      let source_email = source.email;
      let source_phone = source.phone;

      let patient;
      let patient_relation = "self";
      if (String(source_id) == String(patient_id)) {
        patient = await Patient.findById(patient_id);
      } else {
        patient = await Relative.findById(patient_id);
        patient_relation = patient.relation;
      }
      patient_name = patient.name;
      patient_birth = patient.birth;
      patient_gender = patient.gender;

      let compounder = await Compounder.findById(prescription.compounder_id);
      let compounder_name = compounder.name;

      let medicines = [];
      for (let j = 0; j < prescription.medicines.length; j++) {
        let medicine = prescription.medicines[j];
        let med = await Medicine.findById(medicine.medicine_id);
        let medEntry = {
          medicine_name: med.name,
          quantity: medicine.quantity,
          dosage: medicine.dosage,
        };
        medicines.push(medEntry);
      }
      let entry = {
        compounder_name,
        patient_roll_number: source_roll_number,
        patient_email: source_email,
        patient_phone: source_phone,
        patient_name,
        patient_gender,
        patient_birth,
        relation: patient_relation,
        symptoms,
        diagnosis,
        tests,
        remarks,
        medicines,
        date,
      };
      pre.push(entry);
    }
    // console.log("pre", pre);
    res.status(200).send(pre);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   GET /api/prescription/getPrescriptionByDate/:date
// @desc    Get all prescriptions of a doctor on a particular date
// @access  Private
router.get("/getPrescriptionByDate/:date", authDoctor, async (req, res) => {
  const date = new Date(req.params.date);
  try {
    let prescriptions = await Prescription.find({
      doctor_id: req.user.id,
      date: { $gte: date, $lt: new Date(date.getTime() + 86400000) },
    });
    let pre = [];
    for (let i = 0; i < prescriptions.length; i++) {
      let prescription = prescriptions[i];
      let { source_id, patient_id, symptoms, diagnosis, tests, remarks, date } =
        prescription;
      let source = await Patient.findById(source_id);
      let source_roll_number = source.roll_number;
      let source_email = source.email;
      let source_phone = source.phone;

      let patient;
      let patient_relation = "self";
      if (String(source_id) == String(patient_id)) {
        patient = await Patient.findById(patient_id);
      } else {
        patient = await Relative.findById(patient_id);
        patient_relation = patient.relation;
      }
      patient_name = patient.name;
      patient_birth = patient.birth;
      patient_gender = patient.gender;

      let doctor = await Doctor.findById(prescription.doctor_id);
      let doctor_name = doctor.name;

      let medicines = [];
      for (let j = 0; j < prescription.medicines.length; j++) {
        let medicine = prescription.medicines[j];
        let med = await Medicine.findById(medicine.medicine_id);
        let medEntry = {
          medicine_name: med.name,
          quantity: medicine.quantity,
          dosage: medicine.dosage,
        };
        medicines.push(medEntry);
      }
      let entry = {
        doctor_name,
        patient_roll_number: source_roll_number,
        patient_email: source_email,
        patient_phone: source_phone,
        patient_name,
        patient_gender,
        patient_birth,
        relation: patient_relation,
        symptoms,
        diagnosis,
        tests,
        remarks,
        medicines,
        date,
      };
      pre.push(entry);
    }
    res.status(200).send(pre);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   GET /api/prescription/getPrescription/:id
// @desc    Get all prescriptions of a patient who id is passed
// @access  Private
router.get("/getPrescription/:id", authCompounder, async (req, res) => {
  try {
    const { id } = req.params;

    let prescriptions = await Prescription.find({
      patient_id: id,
    });

    let pre = [];
    for (let i = 0; i < prescriptions.length; i++) {
      let prescription = prescriptions[i];
      let { source_id, patient_id, symptoms, diagnosis, tests, remarks, date } =
        prescription;
      let source = await Patient.findById(source_id);
      let source_roll_number = source.roll_number;
      let source_email = source.email;
      let source_phone = source.phone;

      let patient;
      let patient_relation = "self";
      if (String(source_id) == String(patient_id)) {
        patient = await Patient.findById(patient_id);
      } else {
        patient = await Relative.findById(patient_id);
        patient_relation = patient.relation;
      }
      patient_name = patient.name;
      patient_birth = patient.birth;
      patient_gender = patient.gender;

      let compounder_name, doctor_name;
      if (prescription.compounder_id) {
        let compounder = await Compounder.findById(prescription.compounder_id);
        compounder_name = compounder.name;
      } else if (prescription.doctor_id) {
        let doctor = await Doctor.findById(prescription.doctor_id);
        doctor_name = doctor.name;
      }
      let medicines = [];
      for (let j = 0; j < prescription.medicines.length; j++) {
        let medicine = prescription.medicines[j];
        let med = await Medicine.findById(medicine.medicine_id);
        let medEntry = {
          medicine_name: med.name,
          quantity: medicine.quantity,
          dosage: medicine.dosage,
        };
        medicines.push(medEntry);
      }
      let entry = {
        doctor_name,
        compounder_name,
        patient_roll_number: source_roll_number,
        patient_email: source_email,
        patient_phone: source_phone,
        patient_name,
        patient_gender,
        patient_birth,
        relation: patient_relation,
        symptoms,
        diagnosis,
        tests,
        remarks,
        medicines,
        date,
      };
      pre.push(entry);
    }
    // console.log("pre", pre);
    res.status(200).send(pre);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
