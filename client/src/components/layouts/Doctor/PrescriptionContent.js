import React, { useState, useEffect } from "react";

const PrescriptionContent = (props) => {
  const { item, index } = props;
  const [data, setData] = useState(item);
  const [age, setAge] = useState("Age here");
  const d = new Date(data.date);
  const time = d.toLocaleTimeString();
  useEffect(() => {
    setData(item);
  }, [item]);
  useEffect(() => {
    const getAge = (dateString) => {
      var today = new Date();
      var birthDate = new Date(dateString);
      var curr = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        curr--;
      }
      return curr;
    };
    setAge(getAge(data.patient_birth));
  }, []);
  return (
    <div class='row my-4'>
    <div class='col-xl-8' style={{ margin: "auto" }}>
        <div class="card">
            <div class="card-header text-center"> 
            <div className="mx-2"style={{float:"left"}}>Roll/PF Number: {data.patient_roll_number}</div>
             {/* <>Phone : {data.patient_phone} </> */}
            <div className="mx-2" style={{float:"right"}}>email : {data.patient_email}</div>
            </div>
          </div>
          <div class='card-body'>
            <p class='card-text text-muted'>
              {" "}
              Relation : {data.relation}
              <br />
              Patient's Name : {data.patient_name}
              <br />
              Age: {age}&emsp;Gender : {data.patient_gender}
              <br />
            </p>
            {data.doctor_name ? (
              <p class='card-text'>Doctor : {data.doctor_name}</p>
            ) : (
              <p class='card-text'>Compounder : {data.compounder_name}</p>
            )}
            <p class='card-text'>
              Date and time of Diagonsis: {d.toDateString()} {time}
            </p>
            <a
              class='btn btn-success btn-sm'
              data-bs-toggle='collapse'
              href={`#collapseExample-${index}`}
              role='button'
              aria-expanded='false'
              aria-controls='collapseExample'
            >
              View Details
            </a>
            <div class='collapse my-3' id={`collapseExample-${index}`}>
              <div class='card card-body'>
                <p>
                  <strong>Diagnosis</strong>
                  <br />
                  {data.diagnosis}
                </p>
                <p>
                  <strong>Medicines</strong>
                  <br />
                  {data.medicines.map((item, index) => {
                    return (
                      <p>
                        {index + 1})&emsp;{item.medicine_name}&emsp;quantity :{" "}
                        {item.quantity}&emsp; dosage : {item.dosage}
                      </p>
                    );
                  })}
                </p>
                <p>
                  <strong>Tests</strong>
                  <br />
                  {data.tests.map((item, index) => {
                    return (
                      <p>
                        {index + 1})&emsp;{item.test}
                      </p>
                    );
                  })}
                </p>
                <p>
                  <strong>Symptoms</strong>
                  <br />
                  {data.symptoms}
                </p>
                <p>
                  <strong>Remarks</strong>
                  <br />
                  {data.remarks}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionContent;
