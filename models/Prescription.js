const mongoose = require("mongoose");
const Joi = require("joi");

const prescriptionSchema = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  relation: {
    type: String,
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
        type: String,
        required: true,
      },
      stocks: [
        {
          stock_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Stock",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
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
    patient_id: Joi.required(),
    relation: Joi.string().required(),
    doctor_id: Joi.string(),
    compounder_id: Joi.string(),
    date: Joi.date(),
    medicines: Joi.array().items({
      medicine_id: Joi.required(),
      quantity: Joi.number().required(),
      dosage: Joi.string().required(),
      stocks: Joi.array().items({
        stock_id: Joi.required(),
        quantity: Joi.number().required(),
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
