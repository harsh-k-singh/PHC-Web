const mongoose = require("mongoose");
const Joi = require("joi");

const relativeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  source_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  ],
});

const validateRelative = (relative) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    relation: Joi.string().min(3).max(30).required(),
    gender: Joi.string().required(),
    birth: Joi.date().required(),
    source_id: Joi.string(),
    prescriptions: Joi.array().items(Joi.object()),
  });
  return schema.validate(relative);
};

module.exports = {
  Relative: mongoose.model("relative", relativeSchema),
  validateRelative,
};
