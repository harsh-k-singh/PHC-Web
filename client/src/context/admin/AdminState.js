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
    actors: {},
  };

  const { setAlert, clearAlert, setLoading, clearLoading } =
    useContext(GlobalContext);

  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const addActor = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // extract role from formData
      const { role } = formData;
      if (!role)
        throw {
          response: {
            data: "Designation not selected",
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
      const res = await axios.post(
        `/api/admin/addActor/${role}`,
        newFormData,
        config
      );
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

  const getActors = async () => {
    setLoading();
    try {
      const res = await axios.get(`/api/admin/getActors`);
      dispatch({ type: types.GET_ACTORS_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      dispatch({
        type: types.GET_ACTORS_FAILURE,
        payload: error.response.data,
      });
      // setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const addMedicine = async (formData) => {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/admin/addMedicine`, formData, config);
      console.log(res.data);
      await getMedicines();
      clearLoading();
      setAlert({ message: "Medicine added successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const getMedicines = async () => {
    if (state.medicines.length === 0) setLoading();
    try {
      const res = await axios.get(`/api/admin/getMedicine`);
      dispatch({ type: types.GET_MEDICINE_SUCCESS, payload: res.data });
      clearLoading();
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
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

  const updateStock = async (formData) => {
    setLoading();
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
      clearLoading();
      setAlert({ message: "Stock updated successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  const deleteStock = async (id) => {
    setLoading();
    try {
      const res = await axios.delete(`/api/admin/deleteStock?id=${id}`);
      await getStock();
      dispatch({ type: types.DELETE_STOCK_SUCCESS });
      clearLoading();
      setAlert({ message: "Stock deleted successfully", type: "success" });
      setTimeout(clearAlert, 2000);
    } catch (error) {
      console.log(error.response.data);
      clearLoading();
      setAlert({ message: error.response.data, type: "error" });
      setTimeout(clearAlert, 2000);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        medicines: state.medicines,
        stocks: state.stocks,
        actors: state.actors,
        addActor,
        getActors,
        addMedicine,
        getMedicines,
        addStock,
        getStock,
        updateStock,
        deleteStock,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
