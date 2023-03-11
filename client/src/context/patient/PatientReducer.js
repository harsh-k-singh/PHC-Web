import * as types from "../types";

const PatientReducer = (state, action) => {
  if (
    action.type === types.UPDATE_PROFILE_SUCCESS ||
    action.type === types.ADD_RELATIVE_SUCCESS
  ) {
    return {
      ...state,
    };
  } else if (action.type === types.GET_RELATIVES_SUCCESS) {
    return {
      ...state,
      relatives: action.payload,
    };
  } else if (action.type === types.GET_RECORDS_SUCCESS) {
    return {
      ...state,
      records: action.payload,
    };
  } else if (
    action.type === types.UPDATE_PROFILE_FAILURE ||
    action.type === types.GET_RELATIVES_FAILURE ||
    action.type === types.ADD_RELATIVE_FAILURE ||
    action.type === types.UPDATE_RELATIVE_FAILURE ||
    action.type === types.DELETE_RELATIVE_FAILURE ||
    action.type === types.GET_RECORDS_FAILURE
  ) {
    return {
      ...state,
      error: action.payload,
    };
  } else if (action.type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: null,
    };
  } else {
    return state;
  }
};

export default PatientReducer;
