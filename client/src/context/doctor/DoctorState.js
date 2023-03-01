import React, { useReducer } from "react";
import DoctorContext from "./DoctorContext";
import DoctorReducer from "./DoctorReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const DoctorState = (props) => {
  const initialState = {
    error: null,
  };

  const [state, dispatch] = useReducer(DoctorReducer, initialState);

  const updateProfile = async (formData) => {
    console.log("updateProfile called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `/api/doctor/updateProfile`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.UPDATE_PROFILE_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_PROFILE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  return (
    <DoctorContext.Provider
      value={{
        updateProfile,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
