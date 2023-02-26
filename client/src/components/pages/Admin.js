import AdminsHeader from "../layouts/AdminsHeader.js";
import "../../CSSFiles/ActorsBody.css";
import AdminsSP from "../layouts/AdminsSP";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";

const Admin = () => {
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
      if (user.role !== "admin") {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <>
      <AdminsHeader />
      <AdminsSP/>
      <div className='actorsBody'>
        <Outlet />
      </div>
    </>
  );
};
export default Admin;
