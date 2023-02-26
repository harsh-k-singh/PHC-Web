import DoctorsHeader from "../layouts/DoctorsHeader.js";
import "../../CSSFiles/ActorsBody.css";
import SideProfile from "../layouts/SideProfile";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";

const DoctorsPage = () => {
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
      <SideProfile />
      <div className='actorsBody'>
        <Outlet />
      </div>
    </>
  );
};
export default DoctorsPage;
