import {
  ADD_INS_PERSONALS_FAILURE,
  ADD_INS_PERSONALS_REQUEST,
  ADD_INS_PERSONALS_SUCCESS,
  DELETE_INS_PERSONALS_FAILURE,
  DELETE_INS_PERSONALS_REQUEST,
  DELETE_INS_PERSONALS_SUCCESS,
  INS_PERSONALS_FAILURE,
  INS_PERSONALS_REQUEST,
  INS_PERSONALS_SUCCESS,
} from "./actionTypes";

export const InsPersonalsRequest = (
  model,
  searchTerm,
  page,
  limit,
  authToken,
  onSuccess,
  onFailure
) => ({
  type: INS_PERSONALS_REQUEST,
  payload: { model, searchTerm, page, limit, authToken, onSuccess, onFailure },
});

export const InsPersonalssuccess = (data) => ({
  type: INS_PERSONALS_SUCCESS,
  payload: data,
});

export const InsPersonalsfailure = (error) => ({
  type: INS_PERSONALS_FAILURE,
  payload: error,
});

// add dealer

export const addInsPersonalRequest = (
  data,
  authToken,
  onSuccess,
  onFailure
) => ({
  type: ADD_INS_PERSONALS_REQUEST,
  payload: { data, authToken, onSuccess, onFailure },
});

export const addInsPersonalsuccess = (data) => ({
  type: ADD_INS_PERSONALS_SUCCESS,
  payload: data,
});

export const addInsPersonalfailure = (error) => ({
  type: ADD_INS_PERSONALS_FAILURE,
  payload: error,
});

// delete a dealer

export const deleteInsPersonalRequest = (
  id,
  authToken,
  onSuccess,
  onFailure
) => ({
  type: DELETE_INS_PERSONALS_REQUEST,
  payload: { id, authToken, onSuccess, onFailure },
});

export const deleteInsPersonalsuccess = (data) => ({
  type: DELETE_INS_PERSONALS_SUCCESS,
  payload: data,
});

export const deleteInsPersonalfailure = (error) => ({
  type: DELETE_INS_PERSONALS_FAILURE,
  payload: error,
});
