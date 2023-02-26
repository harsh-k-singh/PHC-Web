import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

import { redirect } from "react-router-dom";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const role = "doctor";
  if (role === "doctor") {
    console.log("Doctor");
    return redirect("/doctor");
  } else if (role === "compounder") {
    return redirect("/compounder");
  } else if (role === "admin") {
    return redirect("/admin");
  } else if (role === "patient") {
    return redirect("/patient");
  } else {
    return <div>Invalid Role</div>;
  }
};

export default Dashboard;
