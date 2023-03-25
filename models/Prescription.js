const mongoose = require("mongoose");
const Joi = require("joi");

const prescriptionSchema = mongoose.Schema({
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  compounder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Compounder",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
      },
      amount: {
        type: String,
      },
      dosage_time: {
        type: String,
      },
    },
  ],
  symptoms: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  tests: [{ test: { type: String } }],
  remarks: {
    type: String,
  },
});

const validatePrescription = (prescription) => {
  const schema = Joi.object({
    source_id: Joi.required(),
    patient_id: Joi.required(),
    doctor_id: Joi.string(),
    compounder_id: Joi.string(),
    date: Joi.date(),
    medicines: Joi.array().items({
      name: Joi.string().required(),
      type: Joi.string()
        .required()
        .valid(
          "Tablet",
          "Capsule",
          "Syrup",
          "Injection",
          "Drops",
          "Cream",
          "Ointment",
          "Powder",
          "Other"
        ),
      quantity: Joi.number().required(),
      frequency: Joi.string().valid(
        "Every 24 hours",
        "Every 12 hours",
        "Every 8 hours",
        null
      ),
      amount: Joi.string(),
      dosage_time: Joi.string().valid("Before Food", "After Food"),
    }),
    symptoms: Joi.string(),
    diagnosis: Joi.string(),
    tests: Joi.array().items({
      test: Joi.string(),
    }),
    remarks: Joi.string(),
  });
  return schema.validate(prescription);
};

module.exports = {
  Prescription: mongoose.model("Prescription", prescriptionSchema),
  validatePrescription,
};
