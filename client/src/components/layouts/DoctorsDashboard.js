import React, { useState, useEffect, useContext } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import PrescriptionForm from "./PrescriptionForm";

const DoctorsDashboard = () => {
  const doctorContext = useContext(DoctorContext);
  const{getRelative,relative}=doctorContext;
  const [roll_number, setRollno] = useState("");
  const [redirect, setRedirect] = useState(false);
  const onSubmit = async () => {
    await getRelative(roll_number);
    console.log(roll_number);
    console.log(relative);
    setRedirect(true);
  };
  return (
    <div>
    {redirect===false?<div className='text-center'>
      <h3>ADD NEW RECORD</h3>
      <hr className='mx-4' />
      <div style={{ margin: "auto", width: "30%" }}>
        <input
          type='text'
          className='form-control my-4'
          id='exampleInputRollno.'
          aria-describedby='rollnoHelp'
          placeholder="Enter Patient's Rollno. or PFno."
          name="roll_number"
          value={roll_number}
          onChange={(e) => setRollno(e.target.value)}
        />
        <div class='d-grid gap-2'>
          <button type='button' class='btn btn-primary my-2' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>:<div><PrescriptionForm roll_number={roll_number} relative={relative}/></div>}
    </div>
  );
};

export default DoctorsDashboard;
