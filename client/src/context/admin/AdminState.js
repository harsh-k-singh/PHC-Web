import React, { useReducer } from "react";
import AdminContext from './AdminContext'
import AdminReducer from './AdminReducer'
import axios from 'axios';
import * as types from '../types';

const AdminState = props => {
    const initialState = {
        isAuthenicated: null,
        loading: null,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AdminReducer, initialState);
    const actors = [null, 'addDoctor', 'addCompounder', 'addAdmin'];


    const addDoctor = async (formData) => {
        console.log('addDoctor called...');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/admin/${actors[formData.role]}`, formData, config);
            console.log(res);
            dispatch({ type: types.ADD_DOCTOR_SUCCESS });

        } catch (error) {
            console.log('err', error);
            dispatch({ type: types.ADD_DOCTOR_FAILURE, payload: error.response.data })
            console.log(error.response.data);
            setTimeout(clearError, 2000);
        }
    }
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            await axios.post('/api/register', formData, config);
            dispatch({ type: types.REGISTER_SUCCESS, payload: 4 });
            console.log(formData);
            console.log('registerd');

        } catch (error) {
            dispatch({ type: types.REGISTER_FAILURE, payload: error.response.data })
            console.log(error.response.data);
            setTimeout(clearError, 2000);
        }
    }

    const loadUser = async () => {
        console.log('loaduser called...');
        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: types.LOAD_SUCCESS, payload: res.data })
        } catch (error) {
            dispatch({ type: types.LOAD_ERROR, payload: error.response.data })
            setTimeout(clearError, 2000);
        }
    }

    const clearError = () => {
        dispatch({ type: types.CLEAR_ERROR })
    }

    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(formData);
        try {
            await axios.post('api/auth', formData, config);
            dispatch({ type: types.LOGIN_SUCCESS, payload: formData.role });
            console.log('loggged in');

        } catch (error) {
            console.log(error);
            dispatch({ type: types.LOGIN_FAILURE, payload: error.response.data });
            setTimeout(clearError, 2000);
        }
    }

    const logout = async () => {
        try {
            console.log('here here');
            await axios.delete('/api/auth');
            dispatch({ type: types.LOGOUT_SUCCESS })
        } catch (error) {
            console.log(error);
        }
    }

    return <AdminContext.Provider
        value={{
            error: state.error,
            addDoctor
        }}
    >
        {props.children};
    </AdminContext.Provider>
};

export default AdminState;