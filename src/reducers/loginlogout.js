import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_ERROR,
} from "./../actions/action";

const initialLoginValue = {
    loginSuccess: false,
    role: "",
    user_id: "",
    token: "",
    firstName: "",
    lastName: "",
    dbId: "",
    loading: false,
    error: false,
};

export const loginReducer = (state = initialLoginValue, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                loginSuccess: action.login.loginSuccess,
                role: action.login.role,
                user_id: action.login.userId,
                token: action.login.token,
                firstName: action.login.firstName,
                lastName: action.login.lastName,
                dbId: action.login.id,
                loading: false,
                error: false,
            };
        case LOGIN_REQUEST_ERROR:
            return {
                ...state,
                loginSuccess: false,
                role: "",
                error: true,
            };
        default:
            return state;
    }
};
