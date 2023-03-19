import React, { useReducer, useContext } from "react";
import PatientContext from "./PatientContext";
import PatientReducer from "./PatientReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const PatientState = (props) => {
  const initialState = {
    relatives: [],
    records: [],
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(PatientReducer, initialState);

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
        `/api/patient/updateProfile`,
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

  const getRelatives = async () => {
    if (state.relatives.length == 0) setLoading();
    try {
      const res = await axios.get(`/api/patient/getRelatives`);
      dispatch({ type: types.GET_RELATIVES_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const addRelative = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/patient/addRelative`,
        formData,
        config
      );
      console.log(res);
      dispatch({ type: types.ADD_RELATIVE_SUCCESS });
      await getRelatives();
      clearLoading();
      setAlert({ message: "Relative Added Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const updateRelative = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/patient/updateRelative`,
        formData,
        config
      );
      console.log(res.data);
      await getRelatives();
      clearLoading();
      setAlert({ message: "Relative Updated Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const deleteRelative = async (id) => {
    setLoading();
    try {
      console.log("id", id);
      const res = await axios.delete(`/api/patient/deleteRelative?id=${id}`);
      console.log("res", res);
      await getRelatives();
      clearLoading();
      setAlert({ message: "Relative Deleted Successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const getRecords = async (realtion) => {
    setLoading();
    try {
      console.log("relation form getRecords", realtion);
      const res = await axios.get(`/api/patient/getPrescription/${realtion}`);
      dispatch({ type: types.GET_RECORDS_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        error: state.error,
        relatives: state.relatives,
        records: state.records,
        updateProfile,
        getRelatives,
        addRelative,
        updateRelative,
        deleteRelative,
        getRecords,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
