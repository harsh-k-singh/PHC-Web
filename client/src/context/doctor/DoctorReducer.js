import * as types from "../types";

const DoctorReducer = (state, action) => {
  if (action.type === types.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
    };
  } else if (action.type === types.UPDATE_PROFILE_FAILURE) {
    return {
      ...state,
      error: action.payload,
    };
  } else if (action.type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: null,
    };
  } else if (action.type === types.UPDATE_SCHEDULE_SUCCESS) {
    return { ...state };
  } else if (action.type === types.UPDATE_SCHEDULE_FAILURE) {
    return { ...state };
  } else {
    return state;
  }
};

export default DoctorReducer;
