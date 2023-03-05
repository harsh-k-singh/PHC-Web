const mongoose = require("mongoose");
const Joi = require("joi");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll_number: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "patient",
  },
  profession: {
    type: String,
    default: "Student",
  },
  relative: {
    type: Array,
    default: [],
  },
  guardian_relation: {
    type: String,
  },
  guardian_phone: {
    type: String,
  },
});

const validatePatient = (patient) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    roll_number: Joi.string().min(5).max(10).required(),
    phone: Joi.string().min(10).max(10).required(),
    gender: Joi.string().required(),
    birth: Joi.date().required(),
    password: Joi.string().min(6).max(30).required(),
    profession: Joi.string(),
    relative: Joi.array().items(Joi.object()),
    guardian_relation: Joi.string().allow(null),
    guardian_phone: Joi.string().min(10).max(10).allow(null),
  });
  return schema.validate(patient);
};

module.exports = {
  Patient: mongoose.model("patient", patientSchema),
  validatePatient,
};
