import React, { useContext, useEffect, useState } from "react";
import PatientContext from "../../../context/patient/PatientContext";
import AuthContext from "../../../context/auth/AuthContext";
import RecordContent from "./RecordContent";

const PatientsHistory = () => {
  const patientContext = useContext(PatientContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { getRelatives, relatives, getRecords, records } = patientContext;
  const [id, setId] = useState(null);
  
  const fetchRecords = async (id) => {
    await getRecords(id);
    console.log(id, records);
  };
  useEffect(() => {
    console.log(user);
    setId(user._id);
    const func = async () => {
      await getRelatives();
    };
    func();
    fetchRecords(user._id);
  }, []);

  const onChange = (e) => {
    setId(e.target.value);
    console.log("realtion from onchange", e.target.value);
    fetchRecords(e.target.value);
  };

  return (
    <div>
      <h2 style={{ margin: "auto", textAlign: "center" }}>Past Records</h2>
      <select
        class='form-select my-4'
        aria-label='Select Relation'
        onChange={onChange}
        style={{ width: "40%", margin: "auto", textAlign: "center" }}
      >
        <option value={user ? user._id : null}>Self</option>
        {relatives.length > 0
          ? relatives.map((relative) => {
              return (
                <option value={relative._id}>
                  {relative.relation} ({relative.name})
                </option>
              );
            })
          : null}
      </select>
      {records.length > 0
        ? records.map((item,index) => {
            return (
            <RecordContent item={item} index={index}/>
            );
          })
        : <div
            class='alert alert-primary align-items-center text-center'
            role='alert'
            style={{ width: "60%", margin: "auto" }}
          >
            Patient has No Medical Records.
          </div>}
    </div>
  );
};

export default PatientsHistory;

// date and time
//diagonosis
//prescription
//doctor/compunder
