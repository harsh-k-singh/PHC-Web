import React, { useReducer, useContext } from "react";
import CompounderContext from "./CompounderContext";
import CompounderReducer from "./CompounderReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const CompounderState = (props) => {
  const initialState = {
    relative: [],
    patientExists: null,
    allMedicines: [],
    allPrescription: [],
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(CompounderReducer, initialState);

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
        `/api/compounder/updateProfile`,
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
        `/api/compounder/updateSchedule`,
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

  const clearError = () => {
    dispatch({ type: types.CLEAR_ERROR });
  };

  return (
    <CompounderContext.Provider
      value={{
        getAllMedicines,
        allMedicines: state.allMedicines,
        updateProfile,
        updateSchedule,
      }}
    >
      {props.children}
    </CompounderContext.Provider>
  );
};

export default CompounderState;
