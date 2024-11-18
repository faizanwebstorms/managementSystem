import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "../reducers/auth";
import authSaga from "../sagas/authSaga";
import dealersSaga from "../sagas/dealersSaga";
import dealersReducer from "../reducers/dealers";
import insPersonalsReducer from "../reducers/institutionPersonal";
import insPersonalsSaga from "../sagas/institutionPersonalSaga";
// Create the Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers if you have multiple reducers, or use a single reducer directly
const rootReducer = combineReducers({
  auth: authReducer,
  dealers: dealersReducer,
  insPersonals: insPersonalsReducer,
});

// Create the Redux store with Saga middleware and Redux DevTools extension
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(authSaga);
sagaMiddleware.run(dealersSaga);
sagaMiddleware.run(insPersonalsSaga);
// sagaMiddleware.run(authSaga); other saga

export default store;
