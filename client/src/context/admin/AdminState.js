import React, { useReducer, useContext } from "react";
import AdminContext from "./AdminContext";
import AdminReducer from "./AdminReducer";
import axios from "axios";
import * as types from "../types";
import GlobalContext from "../global/GlobalContext";

axios.defaults.withCredentials = true;

const AdminState = (props) => {
  const initialState = {
    medicines: [],
    specific_medicine_stock: null,
    stocks: [],
    error: null,
    allMedicines: [],
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(AdminReducer, initialState);
  const actors = [null, "addDoctor", "addCompounder", "addAdmin"];

  const addActor = async (formData) => {
    setLoading();
    console.log("addActor called...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // remove role from formData
      const role = actors[formData.role];
      if (!role)
        throw {
          response: {
            data: "Actor not selected",
          },
        };
      if (formData.password !== formData.cnf_password)
        throw {
          response: {
            data: "Password and Confirm Password do not match",
          },
        };
      const newFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      console.log(newFormData);
      const res = await axios.post(`/api/admin/${role}`, newFormData, config);
      console.log(res.data);
      clearLoading();
      setAlert({ message: "User added successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
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
    if (state.stocks.length == 0) setLoading();
    try {
      const res = await axios.get(`/api/admin/getStock`);
      dispatch({ type: types.GET_STOCK_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
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
    if (state.allMedicines.length == 0) setLoading();
    try {
      const res = await axios.get(`/api/admin/allMedicines`);
      dispatch({ type: types.GET_ALL_MEDICINES_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const addStock = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/admin/addStock`, formData, config);
      console.log(res.data);
      await getStock();
      clearLoading();
      setAlert({ message: "Stock added successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
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
        allMedicines: state.allMedicines,
        stocks: state.stocks,
        error: state.error,
        getAllMedicines,
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
