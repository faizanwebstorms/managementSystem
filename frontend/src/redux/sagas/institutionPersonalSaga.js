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
import {
  ADD_INS_PERSONALS_REQUEST,
  INS_PERSONALS_REQUEST,
} from "../actions/actionTypes";
import {
  addInsPersonalfailure,
  addInsPersonalsuccess,
  InsPersonalsfailure,
  InsPersonalssuccess,
} from "../actions/InstitutionsPersonals";
import {
  addInsPersonalApi,
  insPersonalsListingApi,
} from "../../apis/insPersonals";

function* InsPersonalLising(action) {
  const { model, searchTerm, page, limit, authToken, onSuccess, onFailure } =
    action.payload;
  try {
    const response = yield call(
      insPersonalsListingApi,
      model,
      searchTerm,
      page,
      limit,
      authToken
    );
    yield put(InsPersonalssuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(InsPersonalsfailure(error.message));
    onFailure && onFailure();
  }
}

function* addInstitution(action) {
  const { data, authToken, onSuccess, onFailure } = action.payload;
  try {
    const response = yield call(addInsPersonalApi, data, authToken);
    yield put(addInsPersonalsuccess(response));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(addInsPersonalfailure(error.message));
    onFailure && onFailure();
  }
}

function* insPersonalsSaga() {
  yield takeLatest(INS_PERSONALS_REQUEST, InsPersonalLising);
  yield takeLatest(ADD_INS_PERSONALS_REQUEST, addInstitution);
}

export default insPersonalsSaga;
