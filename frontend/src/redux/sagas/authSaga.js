import { put, takeLatest, call } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
} from "../actions/auth";
import { loginApi, signupApi } from "../../apis/auth";
function* loginSaga(action) {
  const { credentials, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(loginApi, credentials);
    console.log("fdfd", response);
    if (response?.data?.user) {
      localStorage.setItem("authToken", response?.data?.tokens?.access?.token);
    }
    yield put(loginSuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(loginFailure(error.message));
    onFailure && onFailure();
  }
}

function* signupSaga(action) {
  const { data, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(signupApi, data);
    yield put(signupSuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(signupFailure(error.message));
    onFailure && onFailure();
  }
}

function* authSaga() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
  yield takeLatest("SIGNUP_REQUEST", signupSaga);
}

export default authSaga;
