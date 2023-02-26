import React, { useContext, useEffect } from "react";
import PatientsHeader from "../layouts/PatientsHeader.js";
import "../../CSSFiles/ActorsBody.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import PatientsHistory from "../layouts/PatientsHistory";
import PatientsProfile from "../layouts/PatientsProfile";
import CheckDoctorsSchedule from "../layouts/CheckDoctorsSchedule";
import PatientsSP from "../layouts/PatientsSP.js";
import AuthContext from "../../context/auth/AuthContext.js";

const PatientPage = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, loadUser, user } = authContext;
  const navigate = useNavigate();
  return (
    <>
      <PatientsHeader />
      <PatientsSP />
      <div className='actorsBody'>
        <Routes>
          <Route path='/' element={<PatientsHistory />} />
          <Route path='/doctorsSchedule' element={<CheckDoctorsSchedule />} />
          <Route path='/profile' element={<PatientsProfile />} />
        </Routes>
      </div>
    </>
  );
};
export default PatientPage;
