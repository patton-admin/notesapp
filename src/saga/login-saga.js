import { call, put, takeLatest } from "redux-saga/effects";
import { userLogin, userLoginError, userLoginSuccess } from "../actions/login";
import { history } from "../routers/AppRouters.jsx";

import {
  setUpAxiosInterceptors,
  setUpAxiosInterceptorsResponse,
} from "./../api/apiConfig.js";
import { loginUser } from "./../api/api.jsx";

const decodeJSON = (data) => {
  try {
    return jwtDecode(data);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

//saga function that handles the side effects...
export function* loginActionEffect(loginAction) {
  let { username, password, resolve, reject } = loginAction;

  try {
    let data = yield call(loginUser, { username, password });

    let { status } = data;

    if (status === 200) {
      // let { jwtToken } = data.data;
      // let decodedToken = decodeJSON(jwtToken);
      // if (decodedToken) {
      //   let { sub, id, firstName, lastName, role } = decodedToken;
      //   data.token = jwtToken;
      //   data.userId = sub;
      //   data.id = id;
      //   data.firstName = firstName;
      //   data.lastName = lastName;
      //   data.loginSuccess = true;
      //   data.role = role;
      // }
      yield put(userLoginSuccess({}));
      setUpAxiosInterceptors({});
      setUpAxiosInterceptorsResponse();
      history.push("/home");
    }
  } catch (e) {
    history.push("/");
    yield put(userLoginError());
  }
}

//sage function that is initiated in the begining
export function* loginActionWatcher() {
  yield takeLatest("IS_VALID_LOGIN_SUCCESS", loginActionEffect);
}
