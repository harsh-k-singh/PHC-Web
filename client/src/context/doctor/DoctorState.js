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

  const updateSchedule = async (formData) => {
    console.log("updateScheule called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `/api/doctor/updateSchedule`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.UPDATE_SCHEDULE_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_SCHEDULE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const updateAvailability = async (formData) => {
    console.log("updateAvailability called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(
        `/api/doctor/updateAvailability`,
        formData,
        config
      );
      console.log(res);
    } catch (error) {
      dispatch({
        type: types.UPDATE_AVAILABILITY_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getAllMedicines = async () => {
    try {
      const res = await axios.get(`/api/doctor/allMedicines`);
      dispatch({ type: types.GET_ALL_MEDICINES_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_ALL_MEDICINES_FAILURE,
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
        getAllMedicines,
        allMedicines: state.allMedicines,
        updateProfile,
        updateSchedule,
        updateAvailability,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
