import * as types from "../types";

const GlobalReducer = (state, action) => {
  if (action.type === types.SET_SCHEDULE) {
    return {
      ...state,
      schedule: action.payload,
    };
  } else if (action.type === types.SET_WIDTH) {
    return {
      ...state,
      width: window.innerWidth,
    };
  } else if (action.type === types.SET_HEIGHT) {
    return {
      ...state,
      height: window.innerHeight,
    };
  } else if (action.type === types.SET_IS_MOBILE) {
    return {
      ...state,
      isMobile: true,
    };
  } else if (action.type === types.SET_IS_NOT_MOBILE) {
    return {
      ...state,
      isMobile: false,
    };
  }
};

export default GlobalReducer;
