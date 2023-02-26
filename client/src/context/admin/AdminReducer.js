import * as types from '../types';

const AdminReducer = (state, action) => {

    if (action.type === types.ADD_DOCTOR_SUCCESS) {
        return {
            ...state,
        }
    }

    else if (action.type === types.ADD_DOCTOR_FAILURE) {
        return {
            ...state,
            error: action.payload,
        }
    }

    else if (action.type === types.CLEAR_ERROR) {
        return {
            ...state,
            error: null
        }
    }

    else {
        return state;
    }

}

export default AdminReducer;