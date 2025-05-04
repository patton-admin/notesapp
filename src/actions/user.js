/***
 * type: Action(User)
 * Operations : addUser, deleteUser, updateUser
 */

import {
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILURE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER_MESSAGE,
} from "./action";

export const user = {
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
    createdDate: "",
    updatedBy: "",
    date: "",
    time: "",
    userId: "",
    password: "",
};

//create user object...
export const addUser = (payload = {}) => ({
    type: ADD_USER,
    user: payload,
});

export const addUserSuccess = (payload = {}) => ({
    type: ADD_USER_SUCCESS,
    user: payload,
});

export const addUserFailure = (payload = {}) => ({
    type: ADD_USER_ERROR,
    message: payload,
});

//getAllUser...
export const getAllUser = (payload = {}) => ({
    type: GET_ALL_USER,
});
export const getAllUserSuccess = (payload = {}) => ({
    type: GET_ALL_USER_SUCCESS,
    user: payload,
});
export const getAllUserFailure = (payload = {}) => ({
    type: GET_ALL_USER_FAILURE,
    message: payload,
});

//update object...
//while implementing just write the test case first... Still not yet used in the application...
export const updateUser = (userid, payload = {}) => ({
    type: UPDATE_USER,
    userid,
    user: payload,
});
export const updateUserSuccess = (userid, payload = {}) => ({
    type: UPDATE_USER_SUCCESS,
    userid,
    user: payload,
});
export const updateUserFailure = (userid, payload = {}) => ({
    type: UPDATE_USER_FAILURE,
    userid,
    user: payload,
});

//update user Message...
export const updateUserMessage = () => ({
    type: UPDATE_USER_MESSAGE,
    message: "",
});

//user navigating to createScreen
export const navCreateUser = () => ({
    type: "NAV_CREATE_USER",
    user: { page: "create" },
});

//user navigating to viewScreen
export const navViewUser = () => ({
    type: "NAV_VIEW_USER",
    user: { page: "view" },
});

//user navigating to editScreen
export const navEditUser = () => ({
    type: "NAV_EDIT_USER",
    user: { page: "edit" },
});

export const deleteUser = ({ userId } = {}) => ({
    type: DELETE_USER,
    userId,
});

export const deleteUserSuccess = (payload = {}) => ({
    type: DELETE_USER_SUCCESS,
    userId: payload,
});
export const deleteUserFailure = (payload = {}) => ({
    type: DELETE_USER_FAILURE,
    user: payload,
});
