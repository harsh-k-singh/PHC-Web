import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorContext from "../../../context/doctor/DoctorContext";

const DoctorsDashboard = () => {
  const doctorContext = useContext(DoctorContext);
  const { patientExists, checkPatientExists, getRelative, relative } =
    doctorContext;

  const [option, setOption] = useState("addRecord");

  const [add_roll_number, setAddRollno] = useState("");
  const [check_roll_number, setCheckRollno] = useState("");
  const [relation, setRelation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      await getRelative(check_roll_number);
    };
    func();
  }, [check_roll_number]);

  useEffect(() => {
    if (patientExists === true && option === "addRecord") {
      navigate(`/doctor/addRecord/${add_roll_number}`);
    } else if (patientExists === true && option === "checkRecord") {
      navigate(`/doctor/checkRecord/${check_roll_number}/${relation}`);
    }
  }, [patientExists]);

  const onAddSubmit = async () => {
    console.log(add_roll_number);
    await checkPatientExists(add_roll_number);
  };

  const onCheckSubmit = async () => {
    console.log(check_roll_number);
    await checkPatientExists(check_roll_number);
  };

  const onChange = (e) => {
    setRelation(e.target.value);
    console.log("realtion from onchange", e.target.value, relation);
    // fetchRecords(e.target.value);
  };
  return (
    <div>
      <div className='m-4 text-center'>
        <button
          class={`btn ${
            option === "addRecord" ? "btn-danger" : "btn-outline-danger"
          } mx-2 my-2`}
          onClick={() => setOption("addRecord")}
          style={{ width: "15%" }}
          >
          Add Record
        </button>
        <button
          class={`btn ${
            option === "checkRecord" ? "btn-danger" : "btn-outline-danger"
          } mx-2 my-2`}
          onClick={() => setOption("checkRecord")}
          style={{ width: "15%" }}
        >
          Check Record
        </button>
      </div>
      {option === "addRecord" ? (
        <div className='text-center'>
          <hr className='mx-4' />
          <div style={{ margin: "auto", width: "30%" }}>
            <input
              type='text'
              className='form-control my-4'
              id='exampleInputRollno.'
              aria-describedby='rollnoHelp'
              placeholder="Enter Patient's Rollno. or PFno."
              name='add_roll_number'
              value={add_roll_number}
              onChange={(e) => setAddRollno(e.target.value)}
            />
            <div class='d-grid gap-2'>
              <button
                type='button'
                class='btn btn-success my-2'
                onClick={onAddSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <hr className='mx-4' />
          <div style={{ margin: "auto", width: "30%" }}>
            <input
              type='text'
              className='form-control my-4'
              id='exampleInputRollno.'
              aria-describedby='rollnoHelp'
              placeholder="Enter Patient's Rollno. or PFno."
              name='check_roll_number'
              value={check_roll_number}
              onChange={(e) => setCheckRollno(e.target.value)}
            />
            {/* <label class='small mb-1' for='inputrelation'>
            Relation
          </label> */}
            <select
              class='form-select my-3'
              aria-label='Select Relation'
              onChange={onChange}
            >
              <option selected>Select Relation</option>
              {relative.map((rel) => (
                <option value={rel.relative_id}>
                  {rel.name}--{rel.relation}
                </option>
              ))}
            </select>
            <div class='d-grid gap-2'>
              <button
                type='button'
                class='btn btn-success my-2'
                onClick={onCheckSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsDashboard;
