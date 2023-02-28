import * as types from "../types";

const CompounderReducer = (state, action) => {
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
  } else {
    return state;
  }
};

export default CompounderReducer;
