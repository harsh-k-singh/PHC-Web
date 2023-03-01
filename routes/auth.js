const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Doctor } = require("../models/Doctor");
const { Patient } = require("../models/Patient");
const { Compounder } = require("../models/Compounder");
const { Admin } = require("../models/Admin");
const config = require("config");
const middleware = require("../middleware/auth");

const actors = [null, Doctor, Compounder, Admin, Patient];

router.get("/", middleware, async (req, res) => {
  try {
    console.log("reached here");
    const Curr = actors[req.user.role];
    const user = await Curr.findById(req.user.id).select("-password");
    return res.send(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.role);
  const Curr = actors[req.body.role];
  console.log(Curr);
  if (Curr === null) return res.status(500).send("No such role");
  const { error } = Joi.object({
    role: Joi.number(),
    email: Joi.string().email().required(),
    password: Joi.string().max(30).required(),
  }).validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const curr = await Curr.findOne({ email });
    if (!curr || !(await bcrypt.compare(password, curr.password)))
      return res.status(400).send("Invalid user name or password");
    const payload = {
      role: req.body.role,
      id: curr.id,
      name: curr.name,
    };

    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 60 * 60 * 24 * 14,
    });
    console.log("the token is", token);
    res.cookie("token", token);

    const user = await Curr.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).send("Invalid Details");
    res.send("Logged in");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/", middleware, async (req, res) => {
  console.log("deleting cookie..");
  res.clearCookie("token");
  res.send("Logout");
});

module.exports = router;
