const mongoose = require("mongoose");
const Joi = require("joi");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  availableStock: {
    type: Array,
    default: [],
  },
  deadStock: {
    type: Array,
    default: [],
  },
});

const validateMedicine = (medicine) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(medicine);
};

module.exports = {
  Medicine: mongoose.model("Medicine", medicineSchema),
  validateMedicine,
};
