import CompoundersHeader from "../layouts/Compounder/CompoundersHeader.js";
import CompoundersSP from "../layouts/Compounder/CompoundersSP";
import styles from "../../CSSFiles/Actor.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import GlobalContext from "../../context/global/GlobalContext.js";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const Compounder = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenicated, user, loadUser } = authContext;
  const globalContext = useContext(GlobalContext);
  const { alert, loading } = globalContext;
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

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

  useEffect(() => {
    if (alert) {
      setState({ open: true, vertical: "top", horizontal: "center" });
    } else {
      setState({ ...state, open: false });
    }
  }, [alert]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <CompoundersHeader />
      {alert ? (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open}>
          <Alert severity={alert.type}>{alert.message}</Alert>
        </Snackbar>
      ) : null}
      <div className={`${styles.main_area}`}>
        <CompoundersSP />
        <div className={`${styles.content}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Compounder;
