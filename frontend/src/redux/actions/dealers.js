export const dealersRequest = (
  page,
  limit,
  authToken,
  onSuccess,
  onFailure
) => ({
  type: "DEALERS_REQUEST",
  payload: { page, limit, authToken, onSuccess, onFailure },
});

export const dealerssuccess = (data) => ({
  type: "DEALERS_SUCCESS",
  payload: data,
});

export const dealersfailure = (error) => ({
  type: "DEALERS_FAILURE",
  payload: error,
});

// add dealer

export const adddealerRequest = (data, authToken, onSuccess, onFailure) => ({
  type: "DEALERS_ADD_REQUEST",
  payload: { data, authToken, onSuccess, onFailure },
});

export const adddealersuccess = (data) => ({
  type: "DEALERS_ADD_SUCCESS",
  payload: data,
});

export const adddealerfailure = (error) => ({
  type: "DEALERS_ADD_FAILURE",
  payload: error,
});

// delete a dealer

export const deletedealerRequest = (id, authToken, onSuccess, onFailure) => ({
  type: "DEALERS_DELETE_REQUEST",
  payload: { id, authToken, onSuccess, onFailure },
});

export const deletedealersuccess = (data) => ({
  type: "DEALERS_DELETE_SUCCESS",
  payload: data,
});

export const deletedealerfailure = (error) => ({
  type: "DEALERS_DELETE_FAILURE",
  payload: error,
});
