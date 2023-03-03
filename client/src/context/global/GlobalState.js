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
    schedule: null,
  };

  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const getSchedule = async () => {
    try {
      const res = await axios.get("/api/schedule/all");
      dispatch({ type: types.SET_SCHEDULE, payload: res.data });
    } catch (err) {
      console.log(err);
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
        schedule: state.schedule,
        isMobile: state.isMobile,
        width: state.width,
        height: state.height,
        getSchedule,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;