import React, { useReducer, useContext } from "react";
import CompounderContext from "./CompounderContext";
import CompounderReducer from "./CompounderReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const CompounderState = (props) => {
  const initialState = {
    patientExists: null,
    medicines: [],
    allPrescription: [],
    prescription: [],
    relative: [],
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(CompounderReducer, initialState);

  const updateProfile = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/compounder/updateProfile`,
        formData,
        config
      );
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
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/compounder/updateSchedule`,
        formData,
        config
      );
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

  const getMedicines = async () => {
    if (state.medicines.length == 0) setLoading();
    try {
      const res = await axios.get(`/api/compounder/getMedicine`);
      dispatch({ type: types.GET_MEDICINE_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ type: "error", message: error.response.data });
    }
  };

  const checkPatientExists = async (roll_number) => {
    console.log("checkPatientExists called...");
    try {
      const res = await axios.get(
        `/api/compounder/patientExists?roll_number=${roll_number}`
      );
      dispatch({ type: types.PATIENT_EXISTS_SUCCESS, payload: res.data });
      setTimeout(() => {
        dispatch({ type: types.CLEAR_PATIENT_EXISTS });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      setAlert({ type: "error", message: error.response.data });
      setTimeout(clearAlert, 2000);
    }
  };

  const getRelative = async (roll_number) => {
    try {
      const res = await axios.get(
        `/api/compounder/getRelative?roll_number=${roll_number}`
      );
      dispatch({ type: types.GET_RELATIVES_SUCCESS, payload: res.data });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // to check
  const addPrescription = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/compounder/addPrescription`,
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
      const res = await axios.get(`/api/compounder/getPrescription`);
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

  const getPrescriptionByID = async (id) => {
    if (state.prescription.length == 0) setLoading();
    try {
      console.log("reached getPreById", id);
      const res = await axios.get(`/api/compounder/getPrescription/${id}`);
      dispatch({
        type: types.GET_PRESCRIPTION_BY_ID_SUCCESS,
        payload: res.data,
      });
      clearLoading();
      if (state.prescription.length == 0)
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

  return (
    <CompounderContext.Provider
      value={{
        allPrescription: state.allPrescription,
        prescription: state.prescription,
        relative: state.relative,
        medicines: state.medicines,
        patientExists: state.patientExists,
        getMedicines,
        addPrescription,
        getPrescription,
        getPrescriptionByID,
        getRelative,
        updateProfile,
        updateSchedule,
        checkPatientExists,
      }}
    >
      {props.children}
    </CompounderContext.Provider>
  );
};

export default CompounderState;
