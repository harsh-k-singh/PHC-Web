import PatientsHeader from "../layouts/PatientsHeader";
import PatientsSP from "../layouts/PatientsSP";

import styles from "../../CSSFiles/Actor.module.css";

import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";

const Patient = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, user, loadUser } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenicated) {
      navigate("/");
    } else {
      if (!user) {
        loadUser();
      }
    }
  }, [isAuthenicated, user]);

  useEffect(() => {
    if (user) {
      if (user.role !== "patient") {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <>
      <PatientsHeader/>
      <PatientsSP/>
      <div className={`${styles.content}`}>
        <Outlet />
      </div>
    </>
  );
};
export default Patient;
