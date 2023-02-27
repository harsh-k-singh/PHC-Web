import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import * as types from "../types";

const AuthState = (props) => {
  const initialState = {
    isAuthenicated: null,
    loading: null,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("/api/register", formData, config);
      dispatch({ type: types.REGISTER_SUCCESS, payload: 4 });
      console.log(formData);
      loadUser();
      console.log("registerd");
    } catch (error) {
      dispatch({ type: types.REGISTER_FAILURE, payload: error.response.data });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const loadUser = async () => {
    console.log("loaduser called...");
    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: types.LOAD_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: types.LOAD_ERROR, payload: error.response.data });
      setTimeout(clearError, 2000);
    }
  };

  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData);
    try {
      await axios.post("api/auth", formData, config);
      dispatch({ type: types.LOGIN_SUCCESS, payload: formData.role });
      loadUser();
      console.log("loggged in");
    } catch (error) {
      console.log(error);
      dispatch({ type: types.LOGIN_FAILURE, payload: error.response.data });
      setTimeout(clearError, 2000);
    }
  };

  const logout = async () => {
    try {
      console.log("logout called from authstates");
      await axios.delete("/api/auth");
      dispatch({ type: types.LOGOUT_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenicated: state.isAuthenicated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        clearError,
        login,
        logout,
      }}
    >
      {props.children};
    </AuthContext.Provider>
  );
};

export default AuthState;
