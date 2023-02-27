const mongoose = require("mongoose");
const Joi = require("joi");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  designation: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validateadmin = (admin) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    phone: Joi.string().length(10),
    designation: Joi.string(),
  });
  return schema.validate(admin);
};

// const validatePassword = password => {
//     const schema = new passwordValidator();
//     schema
//         .has().uppercase(1, 'The password should have a minimum of 1 uppercase letter')
//         .has().lowercase(1, 'The password should have a minimum of 1 lowercase letter')
//         .has().digits(1, 'The password should have a minimum of 1 digit');
//     return schema.validate(password, { details: true });
// }

module.exports = {
  Admin: mongoose.model("admin", adminSchema),
  validateadmin,
}
