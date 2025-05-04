import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./../reducers/users";
import { loginReducer } from "./../reducers/loginlogout";
import { utilReducer } from "./../reducers/utils";
import {scoreCardReducer} from "../reducers/scoreCard.js";

import rootSaga from "./../saga/index";


let composeEnhancers = compose;
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV !== "production" && typeof window === "object") {
  /* eslint-disable no-underscore-dangle */
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

export default () => {
  const appReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    // jobOrder: jobOrderReducer,
    // candidate: candidateReducer,
    util: utilReducer,
    scoreCard: scoreCardReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "LOGOUT_REQUEST") {
      state = undefined;
    }
    return appReducer(state, action);
  };

  const store = createStore(rootReducer, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);

  return store;
};
