const mongoose = require("mongoose");
const Joi = require("joi");

const compounderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  degree: {
    type: String,
  },
  birth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  employedment_details: {
    type: String,
  },
  timing: {
    type:{
      monAT: String,
      monDT: String,
      tueAT: String,
      tueDT: String,
      wedAT: String,
      wedDT: String,
      thuAT: String,
      thuDT: String,
      friAT: String,
      friDT: String,
      satAT: String,
      satDT: String,
      sunAT: String,
      sunDT: String,
    },
    default: {
      monAT: '00:00',
      monDT: '00:00',
      tueAT: '00:00',
      tueDT: '00:00',
      wedAT: '00:00',
      wedDT: '00:00',
      thuAT: '00:00',
      thuDT: '00:00',
      friAT: '00:00',
      friDT: '00:00',
      satAT: '00:00',
      satDT: '00:00',
      sunAT: '00:00',
      sunDT: '00:00',
    }
  },
  role: {
    type: String,
    default: "compounder",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validatecompounder = (compounder) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(10),
    degree: Joi.string(),
    birth: Joi.date(),
    gender: Joi.string(),
    employedment_details: Joi.string(),
    timing: Joi.object({
      monAT: Joi.string(),
      monDT: Joi.string(),
      tueAT: Joi.string(),
      tueDT: Joi.string(),
      wedAT: Joi.string(),
      wedDT: Joi.string(),
      thuAT: Joi.string(),
      thuDT: Joi.string(),
      friAT: Joi.string(),
      friDT: Joi.string(),
      satAT: Joi.string(),
      satDT: Joi.string(),
      sunAT: Joi.string(),
      sunDT: Joi.string(),
    }),
  });
  return schema.validate(compounder);
};

module.exports = {
  Compounder: mongoose.model("compounder", compounderSchema),
  validatecompounder,
};
