import React, { useReducer } from "react";
import PatientContext from "./PatientContext";
import PatientReducer from "./PatientReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const PatientState = (props) => {
  const initialState = {
    error: null,
    relatives: [],
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

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
        `/api/patient/updateProfile`,
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

  const getRelatives = async () => {
    try {
      const res = await axios.get(`/api/patient/getRelatives`);
      dispatch({ type: types.GET_RELATIVES_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_RELATIVES_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const addRelative = async (formData) => {
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
    } catch (error) {
      dispatch({
        type: types.ADD_RELATIVE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const updateRelative = async (formData) => {
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
      dispatch({ type: types.UPDATE_RELATIVE_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_RELATIVE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const deleteRelative = async (id) => {
    try {
      console.log("id", id);
      const res = await axios.delete(`/api/patient/deleteRelative?id=${id}`);
      console.log("res", res);
      await getRelatives();
      dispatch({ type: types.DELETE_RELATIVE_SUCCESS });
      await getRelatives();
    } catch (error) {
      dispatch({
        type: types.DELETE_RELATIVE_FAILURE,
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
    <PatientContext.Provider
      value={{
        error: state.error,
        relatives: state.relatives,
        updateProfile,
        getRelatives,
        addRelative,
        updateRelative,
        deleteRelative,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
