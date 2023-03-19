import React, { useContext, useEffect, useState } from "react";
import PatientContext from "../../../context/patient/PatientContext";
import AuthContext from "../../../context/auth/AuthContext";

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
    fetchRecords(id);
  };

  return (
    <div>
      <h2 style={{ margin: "auto", textAlign: "center" }}>Past Records</h2>
      <select onChange={onChange}>
        <option value={user ? user._id : null}>Self</option>
        {relatives.length > 0
          ? relatives.map((relative) => {
              return (
                <option value={relative._id}>
                  {relative.relation}--{relative.name}
                </option>
              );
            })
          : null}
      </select>
      {records.length > 0
        ? records.map((record) => {
            return (
              <div
                class='card border-success border-3 mb-5 mt-3'
                style={{ maxWidth: "45rem", margin: "auto" }}
              >
                <div class='card-header' style={{ textAlign: "center" }}>
                  Date of Diagonsis: {record.date}
                </div>
                <div class='card-body'>
                  <div class='card-text'>
                    <p>
                      <strong>Attendant</strong>
                      <br />
                      {record.doctor_id
                        ? record.doctor_id
                        : record.compounder_id}
                    </p>
                    <p>
                      <strong>Symptoms</strong>
                      <br />
                      {record.symptoms}
                    </p>
                    <p>
                      <strong>Daignosis</strong>
                      <br />
                      {record.diagnosis}
                    </p>
                    <p>
                      <strong>Medcines</strong>
                      <br />
                      {record.medicines.map((medicine) => {
                        return (
                          <p>
                            {medicine._id}--{medicine.dosage}
                          </p>
                        );
                      })}
                    </p>
                    <p>
                      <strong>Tests</strong>
                      <br />
                      {record.tests.map((test) => {
                        return <p>{test._id}</p>;
                      })}
                    </p>
                    <p>
                      <strong>Remarks</strong>
                      <br />
                      {record.remarks}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default PatientsHistory;

// date and time
//diagonosis
//prescription
//doctor/compunder
