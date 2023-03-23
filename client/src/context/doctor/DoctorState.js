import React, { useReducer, useContext } from "react";
import DoctorContext from "./DoctorContext";
import DoctorReducer from "./DoctorReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const DoctorState = (props) => {
  const initialState = {
    patientExists: null,
    allMedicines: [],
    allPrescription: [],
    prescription: [],
    relative: [],
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(DoctorReducer, initialState);

  const updateProfile = async (formData) => {
    setLoading();
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
      clearLoading();
      setAlert({ message: "Profile Updated Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const updateSchedule = async (formData) => {
    setLoading();
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
      clearLoading();
      setAlert({ message: "Schedule Updated Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
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
    if (state.allMedicines.length === 0) setLoading();
    try {
      const res = await axios.get(`/api/doctor/allMedicinesWithQuantity`);
      dispatch({ type: types.GET_ALL_MEDICINES_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ type: "error", message: error.response.data });
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
    setLoading();
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
      clearLoading();
      setAlert({ message: "Prescription Added Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const getPrescription = async () => {
    if (state.allPrescription.length === 0) setLoading();
    try {
      console.log("reached getPre");
      const res = await axios.get(`/api/doctor/getPrescription`);
      dispatch({ type: types.GET_PRESCRIPTION_SUCCESS, payload: res.data });
      clearLoading();
      // if (state.allPrescription.length === 0)
      //   setAlert({
      //     type: "success",
      //     message: "Prescription fetched successfully",
      //   });
      // setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      if (state.allPrescription.length === 0)
        setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const getPrescriptionByDate = async (date) => {
    setLoading();
    try {
      const res = await axios.get(`/api/doctor/getPrescriptionByDate/${date}`);
      dispatch({ type: types.GET_PRESCRIPTION_SUCCESS, payload: res.data });
      clearLoading();
      // if (state.allPrescription.length === 0)
      //   setAlert({
      //     type: "success",
      //     message: "Prescription fetched successfully",
      //   });
      // setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      // if (state.allPrescription.length === 0)
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const getPrescriptionByID = async (id) => {
    setLoading();
    try {
      console.log("reached getPreById", id);
      const res = await axios.get(`/api/doctor/getPrescription/${id}`);
      dispatch({
        type: types.GET_PRESCRIPTION_BY_ID_SUCCESS,
        payload: res.data,
      });
      clearLoading();
      setAlert({
        type: "success",
        message: "Prescription fetched successfully",
      });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  const clearState = () => {
    dispatch({ type: types.CLEAR_STATE });
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
      dispatch({
        type: types.PATIENT_EXISTS_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(() => {
        dispatch({ type: types.CLEAR_PATIENT_EXISTS });
      }, 2000);
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
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
        clearState,
        getPrescriptionByDate,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
