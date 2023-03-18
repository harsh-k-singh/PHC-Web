import CompoundersHeader from "../layouts/Compounder/CompoundersHeader.js";
import CompoundersSP from "../layouts/Compounder/CompoundersSP";

import styles from "../../CSSFiles/Actor.module.css";

import { Outlet, useNavigate} from "react-router-dom";
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
      <div className={`${styles.main_area}`}>
        <CompoundersSP/>
        <div className={`${styles.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Compounder;
