import HomeHeader from "../layouts/Home/HomeHeader";
import { Outlet } from "react-router-dom";
import Alert from "@mui/material/Alert";
import GlobalContext from "../../context/global/GlobalContext";
import { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const globalContext = useContext(GlobalContext);
  const { alert, loading } = globalContext;
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <HomeHeader />
      {alert ? (
        <Alert
          style={{ fontSize: 20, position: "absolute", width: "100%" }}
          variant='filled'
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      ) : null}
      <Outlet />
    </>
  );
};

export default Home;
