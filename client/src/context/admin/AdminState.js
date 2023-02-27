import React, { useReducer } from "react";
import AdminContext from './AdminContext'
import AdminReducer from './AdminReducer'
import axios from 'axios';
import * as types from '../types';

axios.defaults.withCredentials = true;

const AdminState = props => {
    const initialState = {
        isAuthenicated: null,
        loading: null,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AdminReducer, initialState);
    const actors = [null, 'addDoctor', 'addCompounder', 'addAdmin'];


    const addActor = async (formData) => {
        console.log('addActor called...');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            // remove role from formData
            const role = actors[formData.role];
            const newFormData = { name: formData.name, email: formData.email, password: formData.password };
            console.log(newFormData);
            const res = await axios.post(`/api/admin/${role}`, newFormData, config);
            console.log(res);
            dispatch({ type: types.ADD_ACTOR_SUCCESS });

        } catch (error) {
            console.log('err', error);
            dispatch({ type: types.ADD_ACTOR_FAILURE, payload: error.response.data })
            console.log(error.response.data);
            setTimeout(clearError, 2000);
        }
    }
    const clearError = () => {
        dispatch({ type: types.CLEAR_ERROR })
    }


    return <AdminContext.Provider
        value={{
            error: state.error,
            addActor
        }}
    >
        {props.children}
    </AdminContext.Provider>
};

export default AdminState;