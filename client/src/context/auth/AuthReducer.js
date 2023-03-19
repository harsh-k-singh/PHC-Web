import * as types from "../types";

const AuthReducer = (state, action) => {
  if (
    action.type === types.REGISTER_SUCCESS ||
    action.type === types.LOGIN_SUCCESS
  ) {
    localStorage.setItem("isAuthenicated", true);
    return {
      ...state,
      isAuthenicated: true,
    };
  } else if (
    action.type === types.REGISTER_FAILURE ||
    action.type === types.LOAD_ERROR ||
    action.type === types.LOGIN_FAILURE
  ) {
    return {
      ...state,
      isAuthenicated: false,
      user: null,
    };
  } else if (action.type === types.LOAD_SUCCESS) {
    return {
      ...state,
      isAuthenicated: true,
      user: action.payload,
    };
  } else if (action.type === types.LOGOUT_SUCCESS) {
    console.log("logouting from authreducer");
    localStorage.removeItem("isAuthenicated");
    return {
      ...state,
      isAuthenicated: false,
      user: null,
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

export default AuthReducer;
