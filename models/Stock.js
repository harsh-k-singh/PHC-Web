const mongoose = require("mongoose");
const Joi = require("joi");

const stockSchema = mongoose.Schema({
  medicine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  expiry: {
    type: Date,
    required: true,
  },
  initialQuantity: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  seller: {
    type: String,
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validateStock = (stock) => {
  const schema = Joi.object({
    medicine_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    expiry: Joi.date().required(),
    initialQuantity: Joi.number().required(),
    quantity: Joi.number(),
    seller: Joi.string().required(),
  });
  return schema.validate(stock);
};

module.exports = {
  Stock: mongoose.model("Stock", stockSchema),
  validateStock,
};
