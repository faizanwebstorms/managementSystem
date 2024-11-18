import {
  ADD_INS_PERSONALS_FAILURE,
  ADD_INS_PERSONALS_REQUEST,
  ADD_INS_PERSONALS_SUCCESS,
  INS_PERSONALS_FAILURE,
  INS_PERSONALS_REQUEST,
  INS_PERSONALS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  personalsInsData: null,
  addPersonalInsData: null,
  personalsInsLoader: null,
};

const insPersonalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INS_PERSONALS_REQUEST:
    case ADD_INS_PERSONALS_REQUEST:
      return { ...state, personalsInsLoader: true, error: null };
    case INS_PERSONALS_SUCCESS:
      return {
        ...state,
        personalsInsLoader: false,
        personalsInsData: action.payload,
      };
    case ADD_INS_PERSONALS_SUCCESS:
      return {
        ...state,
        personalsInsLoader: false,
        addPersonalInsData: action.payload,
      };
    case INS_PERSONALS_FAILURE:
      return {
        ...state,
        personalsInsLoader: false,
        personalsInsData: null,
        error: action.payload,
      };
    case ADD_INS_PERSONALS_FAILURE:
      return {
        ...state,
        personalsInsLoader: false,
        addPersonalInsData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default insPersonalsReducer;
