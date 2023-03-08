import React, { useReducer } from "react";
import AdminContext from "./AdminContext";
import AdminReducer from "./AdminReducer";
import axios from "axios";
import * as types from "../types";

axios.defaults.withCredentials = true;

const AdminState = (props) => {
  const initialState = {
    medicines: [],
    specific_medicine_stock: null,
    stocks: [],
    error: null,
  };

  const [state, dispatch] = useReducer(AdminReducer, initialState);
  const actors = [null, "addDoctor", "addCompounder", "addAdmin"];

  const addActor = async (formData) => {
    console.log("addActor called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // remove role from formData
      const role = actors[formData.role];
      const newFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      console.log(newFormData);
      const res = await axios.post(`/api/admin/${role}`, newFormData, config);
      console.log(res.data);
      dispatch({ type: types.ADD_ACTOR_SUCCESS });
    } catch (error) {
      console.log("err", error);
      dispatch({ type: types.ADD_ACTOR_FAILURE, payload: error.response.data });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getMedicine = async () => {
    try {
      const res = await axios.get(`/api/admin/getMedicine`);
      dispatch({ type: types.GET_MEDICINE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_MEDICINE_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getStock = async () => {
    try {
      const res = await axios.get(`/api/admin/getStock`);
      dispatch({ type: types.GET_STOCK_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_STOCK_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const getStockByMedicine = async (name) => {
    try {
      const res = await axios.get(`/api/admin/getStock/${name}`);
      dispatch({ type: types.GET_MEDICINE_STOCK_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: types.GET_MEDICINE_STOCK_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };
  const getAllMedicines = async () => {
    try {
      const res = await axios.get(`/api/admin/allMedicines`);
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
  const addStock = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/admin/addStock`, formData, config);
      console.log(res.data);
      await getStock();
      dispatch({ type: types.ADD_STOCK_SUCCESS });
    } catch (error) {
      dispatch({ type: types.ADD_STOCK_FAILURE, payload: error.response.data });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const updateStock = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/admin/updateStock`, formData, config);
      console.log(res.data);
      await getStock();
      dispatch({ type: types.UPDATE_STOCK_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.UPDATE_STOCK_FAILURE,
        payload: error.response.data,
      });
      console.log(error.response.data);
      setTimeout(clearError, 2000);
    }
  };

  const deleteStock = async (id) => {
    try {
      const res = await axios.delete(`/api/admin/deleteStock/${id}`);
      console.log(res.data);
      await getStock();
      dispatch({ type: types.DELETE_STOCK_SUCCESS });
    } catch (error) {
      dispatch({
        type: types.DELETE_STOCK_FAILURE,
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
    <AdminContext.Provider
      value={{
        medicines: state.medicines,
        getAllMedicines,
        allMedicines: state.allMedicines,
        stocks: state.stocks,
        error: state.error,
        addActor,
        getMedicine,
        getStock,
        getStockByMedicine,
        addStock,
        updateStock,
        deleteStock,
        clearError,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
