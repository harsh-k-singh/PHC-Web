import * as types from "../types";

const AdminReducer = (state, action) => {
  if (action.type === types.ADD_ACTOR_SUCCESS) {
    return {
      ...state,
    };
  } else if (action.type === types.GET_MEDICINE_SUCCESS) {
    return {
      ...state,
      medicines: action.payload,
    };
  } else if (action.type === types.GET_STOCK_SUCCESS) {
    return {
      ...state,
      stocks: action.payload,
    };
  } else if (action.type === types.GET_MEDICINE_STOCK_SUCCESS) {
    return {
      ...state,
      specific_medicine_stock: action.payload,
    };
  } else if(action.type===types.GET_ALL_MEDICINES_SUCCESS){
    return({
      ...state,
      allMedicines:action.payload
    })
  }
   else if (
    action.type === types.ADD_ACTOR_FAILURE ||
    action.type === types.GET_MEDICINE_FAILURE ||
    action.type === types.GET_STOCK_FAILURE ||
    action.type === types.ADD_STOCK_FAILURE ||
    action.type === types.UPDATE_STOCK_FAILURE ||
    action.type === types.DELETE_STOCK_FAILURE ||
    action.type === types.GET_MEDICINE_STOCK_FAILURE||
    action.type === types.GET_ALL_MEDICINES_FAILURE
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

export default AdminReducer;
