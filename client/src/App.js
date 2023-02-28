import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";

import Home from "./components/pages/Home";
import HomeBody from './components/layouts/HomeBody';
import SignUpPatient from "./components/layouts/SignUpPatient";
import Ambulance from "./components/layouts/Ambulance";
import About from "./components/layouts/About";

import Doctor from "./components/pages/Doctor";
import DoctorsDashboard from "./components/layouts/DoctorsDashboard";
import DoctorsSchedule from "./components/layouts/DoctorsSchedule";
import DoctorsProfile from "./components/layouts/DoctorsProfile";
import PatientsList from "./components/layouts/PatientsList";
import Inventory from "./components/layouts/Inventory";
import PatientsHistory from "./components/layouts/PatientsHistory";


import Compounder from "./components/pages/Compounder";
import CompoundersProfile from "./components/layouts/CompoundersProfile";
import CompoundersSchedule from "./components/layouts/CompoundersSchedule";
import CompoundersDashboard from "./components/layouts/CompoundersDashboard";

import Admin from "./components/pages/Admin";
import AdminsDashboard from "./components/layouts/AdminsDashboard";
import AddActor from "./components/layouts/AddActor";
import AdminsProfile from "./components/layouts/AdminsProfile";

import Patient from "./components/pages/Patient";
import PatientsProfile from "./components/layouts/PatientsProfile";
import CheckDoctorsSchedule from "./components/layouts/CheckDoctorsSchedule";


const App = () => {
  return (
    <AuthState>
      <AdminState>
        <Router>
          <Routes>
            <Route path='' element={<Home/>}>
              <Route path='/' element={<HomeBody/>} />
              <Route path='signup' element={<SignUpPatient/>} />
              <Route path='doctorsSchedule' element={<CheckDoctorsSchedule/>} />
              <Route path='ambulance' element={<Ambulance/>} />
              <Route path='about' element={<About/>} />
            </Route>
            <Route path='doctor' element={<Doctor />}>
              <Route path='/doctor' element={<DoctorsDashboard />} />
              <Route path='schedule' element={<DoctorsSchedule />} />
              <Route path='profile' element={<DoctorsProfile/>} />
              <Route path='patientsList' element={<PatientsList />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='patientsHistory' element={<PatientsHistory />} />
            </Route>

            <Route path='compounder' element={<Compounder/>}>
              <Route path='/compounder' element={<CompoundersDashboard/>} />
              <Route path='schedule' element={<CompoundersSchedule />} />
              <Route path='profile' element={<CompoundersProfile/>} />
              <Route path='patientsList' element={<PatientsList />} />
              <Route path='inventory' element={<Inventory/>} />
              <Route path='patientsHistory' element={<PatientsHistory />} />
            </Route>

            <Route path='admin' element={<Admin/>}>
              <Route path='/admin' element={<AdminsDashboard/>} />
              <Route path='addActor' element={<AddActor/>} />
              <Route path='profile' element={<AdminsProfile/>} />
              <Route path='inventory' element={<Inventory/>} />
            </Route>

            <Route path='patient' element={<Patient/>}>
              <Route path='/patient' element={<PatientsHistory/>} />
              <Route path='profile' element={<PatientsProfile/>} />
              <Route path='doctorsSchedule' element={<CheckDoctorsSchedule/>} />
            </Route>
          </Routes>
        </Router>
      </AdminState>
    </AuthState>
  )
}

export default App
