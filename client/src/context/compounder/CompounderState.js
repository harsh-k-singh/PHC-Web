import React, { useReducer,useContext } from "react";
import CompounderContext from "./CompounderContext";
import CompounderReducer from "./CompounderReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const CompounderState = (props) => {
  const initialState = {
    error: null,
    patientExists: null,
    allMedicines: [],
    allPrescription: [],
    prescription:[],
    relative:[],
  };
  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);
  const [state, dispatch] = useReducer(CompounderReducer, initialState);

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
        `/api/compounder/updateProfile`,
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
        `/api/compounder/updateSchedule`,
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

  const getAllMedicines = async () => {
    try {
      const res = await axios.get(`/api/compounder/allMedicines`);
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
        `/api/compounder/getRelative?roll_number=${roll_number}`
      );
      dispatch({ type: types.GET_RELATIVES_SUCCESS, payload: res.data });
      console.log(res.data, "logging from getRealive in comstate");
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
      console.log('reached getPre');
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
    try {
      console.log("reached getPreById", id);
      const res = await axios.get(`/api/compounder/getPrescription/${id}`);
      dispatch({
        type: types.GET_PRESCRIPTION_BY_ID_SUCCESS,
        payload: res.data,
      });
      console.log(res.data, "logging from getPreById");
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
    <CompounderContext.Provider
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
        checkPatientExists,
      }}
    >
      {props.children}
    </CompounderContext.Provider>
  );
};

export default CompounderState;
