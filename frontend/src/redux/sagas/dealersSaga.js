import { put, takeLatest, call } from "redux-saga/effects";
import {
  adddealerfailure,
  adddealersuccess,
  dealersfailure,
  dealerssuccess,
  deletedealerfailure,
  deletedealersuccess,
} from "../actions/dealers";
import {
  addDealerApi,
  dealersListingApi,
  deleteDealerApi,
} from "../../apis/dealers";

function* dealersLising(action) {
  const { page, limit, authToken, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(dealersListingApi, page, limit, authToken);
    yield put(dealerssuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(dealersfailure(error.message));
    onFailure && onFailure();
  }
}

function* adddealer(action) {
  const { data, authToken, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(addDealerApi, data, authToken);
    yield put(adddealersuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(adddealerfailure(error.message));
    onFailure && onFailure();
  }
}

function* deletedealer(action) {
  const { id, authToken, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(deleteDealerApi, id, authToken);
    yield put(deletedealersuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(deletedealerfailure(error.message));
    onFailure && onFailure();
  }
}

function* dealersSaga() {
  yield takeLatest("DEALERS_REQUEST", dealersLising);
  yield takeLatest("DEALERS_ADD_REQUEST", adddealer);
  yield takeLatest("DEALERS_DELETE_REQUEST", deletedealer);
}

export default dealersSaga;
