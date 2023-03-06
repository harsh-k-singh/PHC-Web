const mongoose = require("mongoose");
const Joi = require("joi");

const stockSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  medicine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
  },
});

const validateStock = (stock) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    expiry: Joi.date().required(),
    quantity: Joi.number().required(),
    seller: Joi.string().required(),
  });
  return schema.validate(stock);
};

module.exports = {
  Stock: mongoose.model("Stock", stockSchema),
  validateStock,
};
