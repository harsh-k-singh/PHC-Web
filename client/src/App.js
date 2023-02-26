import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";

import PrivateRoute from "./components/routing/PrivateRoute";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/pages/Dashboard";

import Doctor from "./components/pages/Doctor";
import DoctorsDashboard from "./components/layouts/DoctorsDashboard";
import DoctorsSchedule from "./components/layouts/DoctorsSchedule";
import Profile from "./components/layouts/Profile";
import PatientsList from "./components/layouts/PatientsList";
import Inventory from "./components/layouts/Inventory";
import PatientsHistory from "./components/layouts/PatientsHistory";

import Admin from "./components/pages/Admin";

import Patient from "./components/pages/Patient";

const App = () => {
  return (
    <AuthState>
      <AdminState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='about' element={<About />} />

            <Route path='doctor' element={<Doctor />}>
              <Route path='/doctor' element={<DoctorsDashboard />} />
              <Route path='schedule' element={<DoctorsSchedule />} />
              <Route path='profile' element={<Profile />} />
              <Route path='patientsList' element={<PatientsList />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='patientsHistory' element={<PatientsHistory />} />
            </Route>

            <Route path='/admin' element={<Admin />} />
            <Route path='/patient' element={<Patient />} />
          </Routes>
        </Router>
      </AdminState>
    </AuthState>
  );
};

export default App;
