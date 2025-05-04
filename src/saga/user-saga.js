import { call, put, takeLatest } from "redux-saga/effects";
import { ADD_USER, GET_ALL_USER } from "../actions/action";
import {
    addUserFailure,
    addUserSuccess,
    getAllUserSuccess,
    deleteUserSuccess,
    deleteUserFailure,
} from "../actions/user";
import { openModal } from "../actions/util";
import { addUserApi, getAllusers, deleteUserApi } from "../api/api";

export function* addUserEffect(userData) {
    let { user } = userData;
    try {
        const { data, status } = yield call(addUserApi, user);
        if (status === 200 && data !== undefined) {
            yield put(addUserSuccess(data));
            yield put(openModal({ initialVal: {}, isOpen: false }));
        } else {
            yield put(
                addUserFailure(
                    data.message === null ? "Unknown-Error Ocurred..." : data.message
                )
            );
        }
    } catch (e) {
        yield put(addUserFailure());
    }
}

export function* addUserActionWatcher() {
    yield takeLatest(ADD_USER, addUserEffect);
}

//getUser data...
export function* getUserEffect() {
    try {
        const { status, data } = yield call(getAllusers);
        if (status === 200 && data !== undefined) {
            yield put(getAllUserSuccess(data));
        } else {
            yield put(addUserFailure());
        }
    } catch (e) {
        yield put(addUserFailure());
    }
}

export function* getUserActionWatcher() {
    yield takeLatest(GET_ALL_USER, getUserEffect);
}

export function* deleteUserEffect(id) {
    const { userId } = id;
    console.log("id... for deleting the user...", userId);
    try {
        const { status, data } = yield call(deleteUserApi, userId);
        if (status === 200 && data !== undefined) {
            yield put(deleteUserSuccess(userId));
        } else {
            yield put(deleteUserFailure(data));
        }
    } catch (e) {
        yield put(deleteUserFailure());
    }
}

export function* deleteUserWatcher() {
    yield takeLatest("DELETE_USER", deleteUserEffect);
}
