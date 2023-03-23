const mongoose = require("mongoose");
const Joi = require("joi");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  composition: {
    type: String,
  },
  company: {
    type: String,
  },
  description: {
    type: String,
  },
});

const validateMedicine = (medicine) => {
  const schema = Joi.object({
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
    category: Joi.string().required().valid("Generic", "Brand"),
    company: Joi.string(),
    composition: Joi.string(),
    description: Joi.string(),
  });
  return schema.validate(medicine);
};

module.exports = {
  Medicine: mongoose.model("Medicine", medicineSchema),
  validateMedicine,
};
