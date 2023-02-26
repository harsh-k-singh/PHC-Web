const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Doctor, validatedoctor } = require('../models/Doctor');
const { Compounder, validatecompounder } = require('../models/Compounder');
const { Patient, validatePatient } = require('../models/Patient')
const config = require('config');
const middleware = require('../middleware/auth')
const bcrypt = require('bcryptjs')

// const actors = [null, Doctor, null, null, Patient];

router.post('/addDoctor', middleware, async (req, res) => {
    console.log('reached till addDoc');
    const { name, email, password, phone, degree, birth, gender, employment_details, timing } = req.body;

    const { error } = validatedoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        if (await Doctor.findOne({ email }) !== null) return res.status(401).send('Email already exist');

        const hashedPass = await bcrypt.hash(password, 10);
        let doctor = new Doctor({ name, email, phone, degree, birth, gender, employment_details, timing, password: hashedPass });
        await doctor.save();
        res.status(200).send('Doctor Added');

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Something went wrong');
    }
})

router.post('/addCompounder', middleware, async (req, res) => {
    const { name, email, password, phone, degree, birth, gender, employment_details, timing } = req.body;

    const { error } = validatecompounder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        if (await Compounder.findOne({ email }) !== null) return res.status(401).send('Email already exist');

        const hashedPass = await bcrypt.hash(password, 10);
        let compounder = new Compounder({ name, email, phone, degree, birth, gender, employment_details, timing, password: hashedPass });
        await compounder.save();
        res.status(200).send('Compounder Added');

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Something went wrong');
    }
})

module.exports = router