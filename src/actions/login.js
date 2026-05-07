import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  IS_VALID_LOGIN_SUCCESS,
  LOGOUT_REQUEST,
} from "./action";

//onLogin if user is successful in login, then LOGIN_SUCCESS - will occur and check for the role.
export const userLogin = () => ({
  type: LOGIN_REQUEST,
  login: {
    loading: true,
  },
});

export const userLoginSuccess = (payload = ({} = {})) => ({
  type: LOGIN_REQUEST_SUCCESS,
  login: payload,
});
export const userLoginError = () => ({
  type: LOGIN_REQUEST_ERROR,
});

export const validLogin = ({ username, password } = {}) => ({
  type: IS_VALID_LOGIN_SUCCESS,
  username,
  password,
});

export const userLogout = () => ({
  type: LOGOUT_REQUEST,
});
