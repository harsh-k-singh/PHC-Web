import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorContext from "../../../context/doctor/DoctorContext";

const DoctorsDashboard = () => {
  const doctorContext = useContext(DoctorContext);
  const { patientExists, checkPatientExists } = doctorContext;
  const [roll_number, setRollno] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (patientExists === true) {
      navigate(`/doctor/addRecord/${roll_number}`);
    }
  }, [patientExists]);
  const onSubmit = async () => {
    console.log(roll_number);
    await checkPatientExists(roll_number);
  };
  return (
    <div>
      <div className='text-center'>
        <h3>ADD NEW RECORD</h3>
        <hr className='mx-4' />
        <div style={{ margin: "auto", width: "30%" }}>
          <input
            type='text'
            className='form-control my-4'
            id='exampleInputRollno.'
            aria-describedby='rollnoHelp'
            placeholder="Enter Patient's Rollno. or PFno."
            name='roll_number'
            value={roll_number}
            onChange={(e) => setRollno(e.target.value)}
          />
          <div class='d-grid gap-2'>
            <button
              type='button'
              class='btn btn-primary my-2'
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsDashboard;
