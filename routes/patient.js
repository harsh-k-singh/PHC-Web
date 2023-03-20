const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Patient } = require("../models/Patient");
const { Doctor } = require("../models/Doctor");
const { Compounder } = require("../models/Compounder");
const { Medicine } = require("../models/Medicine");
const { Relative, validateRelative } = require("../models/Relative");
const { Prescription } = require("../models/Prescription");
const authPatient = require("../middleware/authPatient");
const bcrypt = require("bcryptjs");

// @route   POST api/patient/register
// @desc    Register a patient
// @access  Public
router.post("/updateProfile", authPatient, async (req, res) => {
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
      profession: Joi.string(),
      guardian_relation: Joi.string().allow(null),
      guardian_phone: Joi.string().min(10).max(10).allow(null),
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
    profession,
    guardian_relation,
    guardian_phone,
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
  if (
    profession === "Student" &&
    (guardian_relation === undefined || guardian_phone === undefined)
  )
    return res.status(400).send("Guardian details are not filled");
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
    patient.guardian_phone = guardian_phone;
    patient.guardian_relation = guardian_relation;
    await patient.save();
    res.status(200).send(patient);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/addRelative", authPatient, async (req, res) => {
  const { name, relation, gender, birth } = req.body;
  const { error } = validateRelative(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // create an api to add the relative of the patient
    // the api should take the patient id from the token
    // the api should take the relative details from the body
    // the api should add the relative in the database
    // the api should return the relative details
    // the api should return the error if the patient is not found

    let patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).send("patient not found");
    if (patient.profession != "Faculty")
      res.status(400).send("Only faculty can add relatives");

    let relative = new Relative({
      name,
      relation,
      gender,
      birth,
      source_id: req.user.id,
    });
    await relative.save();

    // save the relative id in the patient document
    patient.relative.push({
      relative_id: relative._id,
      name: relative.name,
      relation: relative.relation,
    });
    await patient.save();

    res.status(200).send(relative);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/getRelatives", authPatient, async (req, res) => {
  try {
    // create an api to get the relatives of the patient
    // the api should take the patient id from the token
    // the api should return the relatives details
    // the api should return the error if the patient is not found
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).send("patient not found");
    const relatives = await Relative.find({
      source_id: req.user.id,
    });
    res.status(200).send(relatives);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/updateRelative", authPatient, async (req, res) => {
  const { _id, name, relation, gender, birth } = req.body;
  const form = { name, relation, gender, birth };
  const { error } = validateRelative(form);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // create an api to update the relative of the patient
    // the api should take the patient id from the token
    // the api should take the relative details from the body
    // the api should upate the relative in the database
    // the api should return the relative details
    // the api should return the error if the patient is not found

    let patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).send("patient not found");
    if (patient.profession != "Faculty")
      res.status(400).send("Only faculty can update relatives");

    let relative = await Relative.findById(_id);
    if (!relative) return res.status(404).send("Relative not found");
    if (relative.source_id != req.user.id)
      return res
        .status(400)
        .send("You are not authorized to update this relative");
    relative.name = name;
    relative.relation = relation;
    relative.gender = gender;
    relative.birth = birth;
    await relative.save();

    res.status(200).send(relative);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/deleteRelative", authPatient, async (req, res) => {
  const { id } = req.query;
  try {
    // create an api to delete the relative of the patient
    // the api should take the patient id from the token
    // the api should take the relative id from the body
    // the api should delete the relative in the database
    // the api should return the relative details
    // the api should return the error if the patient is not found
    let relative = await Relative.findById(id);
    if (!relative) return res.status(404).send("Relative not found");
    if (relative.source_id != req.user.id)
      return res
        .status(400)
        .send("You are not authorized to delete this relative");
    let patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).send("Patient not found");
    patient.relative = patient.relative.filter((rel) => rel.relative_id != id);
    await patient.save();
    await Relative.findByIdAndDelete(id);
    res.status(200).send("Relative deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/getPrescription/:id", authPatient, async (req, res) => {
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
    res.status(200).send(pre);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong here");
  }
});

module.exports = router;
