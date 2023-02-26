import React, { useContext, useEffect } from "react";
import DoctorsHeader from "../layouts/DoctorsHeader.js";
import "../../CSSFiles/ActorsBody.css";
import SideProfile from "../layouts/SideProfile";
import DoctorsDashboard from "../layouts/DoctorsDashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../layouts/Profile";
import PatientsList from "../layouts/PatientsList";
import Inventory from "../layouts/Inventory";
import PatientsHistory from "../layouts/PatientsHistory";
import AdminsHeader from "../layouts/AdminsHeader";
import AddActor from "../layouts/AddActor.js";
import AuthContext from "../../context/auth/AuthContext.js";

const Admin = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, loadUser, user } = authContext;
  const navigate = useNavigate();
  return (
    <div>
      <AdminsHeader />
      <SideProfile />
      <div className='actorsBody'>
        <Routes>
          <Route exact path='/' element={<DoctorsDashboard />} />
          <Route path='/addActor' element={<AddActor />} />
          <Route path='/patientsList' element={<PatientsList />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/patientsHistory' element={<PatientsHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;

// Inventory - update and peek
// Doctors
// Componders
//Add a doctor and compounder
