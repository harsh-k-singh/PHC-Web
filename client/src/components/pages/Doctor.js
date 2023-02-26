import DoctorsHeader from "../layouts/DoctorsHeader.js";
import DoctorSP from "../layouts/DoctorsSP.js";
import "../../CSSFiles/ActorsBody.css";
import { Outlet, useNavigate, redirect } from "react-router-dom";
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
      <DoctorSP/>
      <div className='actorsBody'>
        <Outlet />
      </div>
    </>
  );
};
export default Doctor;
