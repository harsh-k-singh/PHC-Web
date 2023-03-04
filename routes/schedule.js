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
      timing: [[timing.monAT, timing.monDT], [timing.tueAT, timing.tueDT], [timing.wedAT, timing.wedDT],
              [timing.thuAT, timing.thuDT], [timing.friAT, timing.friDT], [timing.satAT, timing.satDT], 
              [timing.sunAT, timing.sunDT]],
    };
  });

  res.send(schedule);
});


module.exports = router;
