import React, { useContext, useState, useEffect } from "react";
import DoctorContext from "../../../context/doctor/DoctorContext";
import { useParams, useNavigate } from "react-router-dom";
import PrescriptionContent from "./PrescriptionContent";

const CheckRecord = () => {
  const doctorContext = useContext(DoctorContext);
  const navigate = useNavigate();
  const { getPrescriptionByID, prescription } = doctorContext;
  const { check_roll_number, relation } = useParams();
  console.log(check_roll_number, relation);
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (back === true) {
      navigate(`/doctor`);
    }
  }, [back]);

  useEffect(() => {
    const func = async () => {
      await getPrescriptionByID(relation);
    };
    func();
  }, []);
  console.log("pres", prescription);
  return (
    <div class='container-xl px-4'>
      <div style={{ position: "relative", textAlign: "center" }}>
        <button
          class={`btn ${
            back === true ? "btn-danger" : "btn-outline-danger"
          } mx-2 my-1`}
          onClick={() => setBack(true)}
        >
          Back to Dashboard
        </button>
      </div>
      {prescription
        ? prescription.map((item, index) => {
            return <PrescriptionContent item={item} index={index} />;
          })
        : null}
    </div>
  );
};

export default CheckRecord;
