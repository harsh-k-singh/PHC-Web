import CompoundersHeader from "../layouts/CompoundersHeader.js";
import styles from "../../CSSFiles/Actor.module.css";
import CompoundersSP from "../layouts/CompoundersSP";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/auth/AuthContext";

const Compounder = () => {
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
      if (user.role !== "compounder") {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <>
      <CompoundersHeader/>
      <CompoundersSP/>
      <div className={`${styles.content}`}>
        <Outlet />
      </div>
    </>
  );
};
export default Compounder;
