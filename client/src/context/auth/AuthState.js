import React, { useReducer, useContext } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

const AuthState = (props) => {
  const initialState = {
    isAuthenicated: null,
    user: null,
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/register", formData, config);
      dispatch({ type: types.REGISTER_SUCCESS, payload: "patient" });
      console.log(formData);
      loadUser();
      console.log("registerd");
      clearLoading();
      setAlert({ type: "success", message: "Registered successfully" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      clearLoading();
      console.log(error.response.data);
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: types.LOAD_SUCCESS, payload: res.data });
    } catch (error) {
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData);
    try {
      setLoading();
      await axios.post("api/auth", formData, config);
      dispatch({ type: types.LOGIN_SUCCESS, payload: formData.role });
      loadUser();
      clearLoading();
      setAlert({ type: "success", message: "Logged in successfully" });
      setTimeout(clearAlert, 2000);
      console.log("loggged in");
    } catch (error) {
      console.log(error);
      clearLoading();
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const logout = async () => {
    try {
      setLoading();
      await axios.delete("/api/auth");
      clearLoading();
      dispatch({ type: types.LOGOUT_SUCCESS });
      setAlert({ type: "success", message: "Logged out successfully" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error);
      clearLoading();
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
    setTimeout(() => {
      window.location.reload();
    },200);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenicated: state.isAuthenicated,
        user: state.user,
        register,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
