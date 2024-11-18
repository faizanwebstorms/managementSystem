export const loginRequest = (credentials, onSuccess, onFailure) => ({
  type: "LOGIN_REQUEST",
  payload: { credentials, onSuccess, onFailure },
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const signupRequest = (data, onSuccess, onFailure) => ({
  type: "SIGNUP_REQUEST",
  payload: { data, onSuccess, onFailure },
});

export const signupSuccess = (data) => ({
  type: "SIGNUP_SUCCESS",
  payload: data,
});

export const signupFailure = (error) => ({
  type: "SINGUP_FAILURE",
  payload: error,
});
