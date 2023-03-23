import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";
import DoctorState from "./context/doctor/DoctorState";
import CompounderState from "./context/compounder/CompounderState";
import GlobalState from "./context/global/GlobalState";
import PatientState from "./context/patient/PatientState";

import CheckSchedule from "./components/layouts/Schedule/CheckSchedule";

import Home from "./components/pages/Home";
import HomeBody from "./components/layouts/Home/HomeBody";
import SignUpPatient from "./components/layouts/Home/SignUpPatient";
import Ambulance from "./components/layouts/Home/Ambulance";
import About from "./components/layouts/Home/About";

import Doctor from "./components/pages/Doctor";
import DoctorsDashboard from "./components/layouts/Doctor/DoctorsDashboard";
import DoctorsSchedule from "./components/layouts/Doctor/DoctorsSchedule";
import DoctorsProfile from "./components/layouts/Doctor/DoctorsProfile";
import PatientsList from "./components/layouts/Doctor/PatientsList";
import ViewDocMedicine from "./components/layouts/Doctor/ViewDocMedicines";
import PrescriptionForm from "./components/layouts/Doctor/PrescriptionForm";
import CheckRecord from "./components/layouts/Doctor/CheckRecord";

import Compounder from "./components/pages/Compounder";
import CompoundersProfile from "./components/layouts/Compounder/CompoundersProfile";
import CompoundersSchedule from "./components/layouts/Compounder/CompoundersSchedule";
import CompoundersDashboard from "./components/layouts/Compounder/CompoundersDashboard";
import ViewCompMedicine from "./components/layouts/Compounder/ViewCompMedicine";
import PatientsListCompounder from "./components/layouts/Compounder/PatientsListCompounder"
import CheckRecordComp from "./components/layouts/Compounder/CheckRecordComp";
import PrescriptionFormComp from "./components/layouts/Compounder/PrescriptionFormComp";

import Admin from "./components/pages/Admin";
import AdminsDashboard from "./components/layouts/Admin/AdminsDashboard";
import AddActor from "./components/layouts/Admin/AddActor";
import AdminsProfile from "./components/layouts/Admin/AdminsProfile";
import AddStock from "./components/layouts/Admin/AddStock";
import ViewStock from "./components/layouts/Admin/ViewStock";
import ViewAdminMedicine from "./components/layouts/Admin/ViewAdminMedicine";
import AddMedicine from "./components/layouts/Admin/AddMedicine";

import Patient from "./components/pages/Patient";
import PatientsProfile from "./components/layouts/Patient/PatientsProfile";
import FamilyMembers from "./components/layouts/Patient/FamilyMembers";
import PatientsHistory from "./components/layouts/Patient/PatientsHistory";

const App = () => {
  return (
    <GlobalState>
      <AuthState>
        <AdminState>
          <DoctorState>
            <CompounderState>
              <PatientState>
                <Router>
                  <Routes>
                    <Route path='' element={<Home />}>
                      <Route path='/' element={<HomeBody />} />
                      <Route path='signup' element={<SignUpPatient />} />
                      <Route path='schedule' element={<CheckSchedule />} />
                      <Route path='ambulance' element={<Ambulance />} />
                      <Route path='about' element={<About />} />
                    </Route>
                    <Route path='doctor' element={<Doctor />}>
                      <Route path='/doctor' element={<DoctorsDashboard />} />
                      <Route
                        path='addRecord/:roll_number'
                        element={<PrescriptionForm />}
                      />
                      <Route path='schedule' element={<DoctorsSchedule />} />
                      <Route path='profile' element={<DoctorsProfile />} />
                      <Route path='patientsList' element={<PatientsList />} />
                      <Route
                        path='patientsHistory'
                        element={<PatientsHistory />}
                      />
                      <Route
                        path='viewDocMedicine'
                        element={<ViewDocMedicine />}
                      />
                      <Route path='checkRecord/:check_roll_number/:relation' element={<CheckRecord />} />
                    </Route>

                    <Route path='compounder' element={<Compounder />}>
                      <Route
                        path='/compounder'
                        element={<CompoundersDashboard />}
                      />
                      <Route
                        path='schedule'
                        element={<CompoundersSchedule />}
                      />
                      <Route path='profile' element={<CompoundersProfile />} />
                      <Route path='patientsList' element={<PatientsListCompounder/>} />
                      <Route path='checkRecord/:check_roll_number/:relation' element={<CheckRecordComp />} />
                      <Route
                        path='addRecord/:roll_number'
                        element={<PrescriptionFormComp/>}
                      />
                       <Route
                        path='patientsHistory'
                        element={<PatientsHistory />}
                      />
                      <Route
                        path='viewCompMedicine'
                        element={<ViewCompMedicine />}
                      />
                    </Route>

                    <Route path='admin' element={<Admin />}>
                      <Route path='/admin' element={<AdminsDashboard />} />
                      <Route path='addActor' element={<AddActor />} />
                      <Route path='profile' element={<AdminsProfile />} />
                      <Route path='addStock' element={<AddStock />} />
                      <Route path='addMedicine' element={<AddMedicine />} />
                      <Route path='viewStock' element={<ViewStock />} />
                      <Route
                        path='viewAdminMedicine'
                        element={<ViewAdminMedicine />}
                      />
                    </Route>

                    <Route path='patient' element={<Patient />}>
                      <Route path='/patient' element={<PatientsHistory />} />
                      <Route path='profile' element={<PatientsProfile />} />
                      <Route path='familyMembers' element={<FamilyMembers />} />
                      <Route path='schedule' element={<CheckSchedule />} />
                    </Route>
                  </Routes>
                </Router>
              </PatientState>
            </CompounderState>
          </DoctorState>
        </AdminState>
      </AuthState>
    </GlobalState>
  );
};

export default App;
