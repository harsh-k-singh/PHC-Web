const express = require("express");
const router = express.Router();
const { Doctor } = require("../models/Doctor");

router.get("/all", async (req, res) => {
  const allDoctors = await Doctor.find();
  // filter out name, degree and timing from allDoctors
  // and send the result
  const schedule = allDoctors.map((doctor) => {
    const timing = doctor.timing;
    return {
      name: doctor.name,
      degree: doctor.degree,
      timing: {
        monAT: timing.monAT,
        monDT: timing.monDT,
        tueAT: timing.tueAT,
        tueDT: timing.tueDT,
        wedAT: timing.wedAT,
        wedDT: timing.wedDT,
        thuAT: timing.thuAT,
        thuDT: timing.thuDT,
        friAT: timing.friAT,
        friDT: timing.friDT,
        satAT: timing.satAT,
        satDT: timing.satDT,
        sunAT: timing.sunAT,
        sunDT: timing.sunDT,
      },
    };
  });

  res.send(schedule);
});

module.exports = router;
