import React, { useReducer } from "react";
import DoctorContext from "./DoctorContext";
import DoctorReducer from "./DoctorReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const DoctorState = (props) => {
  const initialState = {
    error: null,
    relative: [],
    patientExists: null,
    allMedicines: [],
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

  const getRelative = async (roll_number) => {
    try {
      const res = await axios.get(
        `/api/doctor/getRelative?roll_number=${roll_number}`
      );
      dispatch({ type: types.GET_RELATIVES_SUCCESS, payload: res.data });
      console.log(res.data, "logging from getRealive in docstate");
    } catch (error) {
      dispatch({
        type: types.GET_RELATIVES_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const addPrescription = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/doctor/addPrescription`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.ADD_PRESCRIPTION_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.ADD_PRESCRIPTION_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getPrescription = async () => {
    try {
      console.log('reached getPre');
      const res = await axios.get(`/api/doctor/getPrescription`);
      dispatch({ type: types.GET_PRESCRIPTION_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_PRESCRIPTION_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };
  
  const getPrescriptionByID = async (id) => {
    try {
      console.log('reached getPreById', id);
      const res = await axios.get(`/api/doctor/getPrescription/${id}`);
      dispatch({ type: types.GET_PRESCRIPTION_BY_ID_SUCCESS, payload: res.data });
      console.log(res.data, 'logging from getPreById');
    } catch (error) {
      dispatch({
        type: types.GET_PRESCRIPTION_BY_ID_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };
  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  const checkPatientExists = async (roll_number) => {
    try {
      const res = await axios.get(
        `/api/doctor/patientExists?roll_number=${roll_number}`
      );
      dispatch({ type: types.PATIENT_EXISTS_SUCCESS, payload: res.data });
      setTimeout(() => {
        dispatch({ type: types.CLEAR_PATIENT_EXISTS });
      }, 2000);
    } catch (error) {
      console.log("errjjjd...");
      dispatch({
        type: types.PATIENT_EXISTS_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(() => {
        dispatch({ type: types.CLEAR_PATIENT_EXISTS });
      }, 2000);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        getAllMedicines,
        addPrescription,
        getPrescription,
        allPrescription: state.allPrescription,
        getPrescriptionByID,
        prescription: state.prescription,
        getRelative,
        relative: state.relative,
        allMedicines: state.allMedicines,
        patientExists: state.patientExists,
        updateProfile,
        updateSchedule,
        updateAvailability,
        checkPatientExists,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
