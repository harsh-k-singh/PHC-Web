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
      medicine_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
      quantity: {
        type: Number,
        required: true,
      },
      dosage: {
        frequency: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
        dosage_time: {
          type: String,
          required: true,
        },
      },
    },
  ],
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
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
      medicine_id: Joi.required(),
      quantity: Joi.number().required(),
      dosage: Joi.object({
        frequency: Joi.string()
          .required()
          .valid("Every 24 hours", "Every 12 hours", "Every 8 hours"),
        amount: Joi.string().required(),
        dosage_time: Joi.string().required().valid("Before Food", "After Food"),
      }),
    }),
    symptoms: Joi.string().required(),
    diagnosis: Joi.string().required(),
    tests: Joi.array().items({
      test: Joi.string(),
    }),
    remarks: Joi.string().allow(""),
  });
  return schema.validate(prescription);
};

module.exports = {
  Prescription: mongoose.model("Prescription", prescriptionSchema),
  validatePrescription,
};
