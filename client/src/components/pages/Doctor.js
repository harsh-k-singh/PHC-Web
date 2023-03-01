import DoctorsHeader from "../layouts/DoctorsHeader.js";
import DoctorsSP from "../layouts/DoctorsSP.js";

import styles from "../../CSSFiles/Actor.module.css";

import { Outlet, useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";

const Doctor = () => {
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
      if (user.role !== "doctor") {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <>
      <DoctorsHeader />
      <div className={`${styles.main_area}`}>
        <DoctorsSP/>
        <div className={`${styles.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Doctor;
