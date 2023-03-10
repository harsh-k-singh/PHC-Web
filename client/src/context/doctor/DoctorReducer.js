import * as types from "../types";

const DoctorReducer = (state, action) => {
  if (
    action.type === types.UPDATE_PROFILE_SUCCESS ||
    action.type === types.ADD_PRESCRIPTION_SUCCESS
  ) {
    return {
      ...state,
    };
  } else if (action.type === types.PATIENT_EXISTS_FAILURE) {
    return {
      ...state,
      patientExists: false,
    };
  } else if (action.type === types.PATIENT_EXISTS_SUCCESS) {
    return {
      ...state,
      patientExists: true,
    };
  } else if (action.type === types.GET_ALL_MEDICINES_SUCCESS) {
    return {
      ...state,
      allMedicines: action.payload,
    };
  } else if (action.type === types.GET_RELATIVES_SUCCESS) {
    return {
      ...state,
      relative: action.payload,
    };
  } else if (action.type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: null,
    };
  } else if (action.type === types.CLEAR_PATIENT_EXISTS) {
    return {
      ...state,
      patientExists: null,
    };
  } else if (
    action.type ===
    (types.UPDATE_SCHEDULE_SUCCESS ||
      types.UPDATE_PROFILE_FAILURE ||
      types.GET_ALL_MEDICINES_FAILURE ||
      types.UPDATE_SCHEDULE_FAILURE ||
      types.UPDATE_AVAILABILITY_FAILURE ||
      types.ADD_PRESCRIPTION_FAILURE ||
      types.GET_RELATIVES_FAILURE)
  ) {
    return { ...state, error: action.payload };
  } else {
    return state;
  }
};

export default DoctorReducer;
