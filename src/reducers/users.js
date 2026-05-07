import { addUser } from "./../actions/user";
import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_ERROR,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE,
    UPDATE_USER,
    UPDATE_USER_MESSAGE,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE, LOGOUT_REQUEST,
} from "./../actions/action";

/***
 * default user information
 */
const user = {
    firstName: "",
    lastName: "",
    pryphoneNo: "",
    secryphoneNo: "",
    pryemail: "",
    secryemail: "",
    role: "",
    officeLocation: "",
    country: "",
    createdBy: "",
    updatedBy: "",
    createdDate: "",
    date: "",
    time: "",
    userId: "",
    password: "",
};

const initialStateValue = {
    usrLoading: false,
    usrError: false,
    message: "",
    users: [],
};

export const userReducer = (state = initialStateValue, action) => {
    // console.log("action from users REducer...", action);
    switch (action.type) {
        case GET_ALL_USER:
            return { ...state, usrLoading: true, usrError: false };
        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                users: action.user,
                usrLoading: false,
                usrError: false,
            };

        case GET_ALL_USER_FAILURE:
            return { ...state, usrError: true };

        case ADD_USER:
            return { ...state, usrLoading: true, usrError: false };

        case ADD_USER_SUCCESS:
            let { userId } = action.user;
            let data = state.users.filter((e) => e.userId !== userId);
            data = [...data, action.user];
            return {
                ...state,
                users: data,
                usrLoading: false,
                usrError: false,
            };
        case ADD_USER_ERROR:
            return {
                ...state,
                usrLoading: false,
                usrError: true,
                message: action.message,
            };

        case UPDATE_USER:
            const updateUser = [...state, action.user];
            return updateUser;

        case DELETE_USER:
            return { ...state, usrLoading: true, usrError: false };

        case DELETE_USER_SUCCESS:
            let x = state.users.filter(
                (usr) => !action.userId.join("").includes(usr.id)
            );
            return {
                ...state,
                users: x,
                usrLoading: false,
                usrError: true,
                message: action.message,
            };
        case DELETE_USER_FAILURE:
            return { ...state, usrLoading: false, usrError: true };

        case UPDATE_USER_MESSAGE:
            return {
                ...state,
                message: action.message,
            };

        default:
            return state;
    }
};

const initialLoginValue = {
    loginSuccess: false,
    role: "",
    user_id: "",
    token: "",
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
        case LOGOUT_REQUEST:
            return {
                ...initialLoginValue,
            };
        default:
            return state;
    }
};
