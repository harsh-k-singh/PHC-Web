import React, { useReducer, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const GlobalState = (props) => {
  const initialState = {
    isMobile: false,
    width: window.innerWidth,
    height: window.innerHeight,
    doctorSchedule: null,
    compounderSchedule: null,
    err: null,
    available: null,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getDoctorSchedule = async () => {
    try {
      const res = await axios.get("/api/schedule/doctors");
      dispatch({ type: types.SET_DOCTOR_SCHEDULE_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: types.SET_DOCTOR_SCHEDULE_FAILURE,
        payload: err.response.data,
      });
    }
  };
  const getCompounderSchedule = async () => {
    try {
      const res = await axios.get("/api/schedule/compounders");
      dispatch({
        type: types.SET_COMPOUNDER_SCHEDULE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: types.SET_COMPOUNDER_SCHEDULE_FAILURE,
        payload: err.response.data,
      });
    }
  };

  const getAvailable = async () => {
    try {
      const res = await axios.get("/api/schedule/available");
      dispatch({ type: types.SET_AVAILABLIITY_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.SET_AVAILABLIITY_FAILURE, payload: err.response });
    }
  };

  const updateDimensions = () => {
    if (typeof window !== "undefined") {
      dispatch({ type: types.SET_WIDTH });
      dispatch({ type: types.SET_HEIGHT });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  useEffect(() => {
    if (state.width < 1024) {
      dispatch({ type: types.SET_IS_MOBILE });
    } else {
      dispatch({ type: types.SET_IS_NOT_MOBILE });
    }
  }, [state.width]);

  return (
    <GlobalContext.Provider
      value={{
        doctorSchedule: state.doctorSchedule,
        compounderSchedule: state.compounderSchedule,
        isMobile: state.isMobile,
        width: state.width,
        height: state.height,
        err: state.err,
        available: state.available,
        getDoctorSchedule,
        getCompounderSchedule,
        getAvailable,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
