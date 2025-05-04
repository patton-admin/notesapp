import { call, put, takeLatest } from "redux-saga/effects";
import {
    addClientFailure,
    addClientSuccess,
    viewClientFailure,
    viewClientSuccess,
    updateClientSuccess,
    updateClientFailure,
    deleteClientSuccess,
    deleteClientFailure,
} from "../actions/client";
import { openModal } from "../actions/util";
import {
    addClientApi,
    updateClientApi,
    getAllClients,
    deleteClientApi,
} from "../api/api";

export function* getAllClientEffect() {
    try {
        const { status, data } = yield call(getAllClients, { method: "get" });
        if (status === 200 && data !== undefined) {
            yield put(viewClientSuccess(data));
        } else {
            yield put(
                viewClientFailure(
                    data.message === null ? "Unknown-Error Ocurred..." : data.message
                )
            );
        }
    } catch {
        yield put(viewClientFailure());
    }
}

export function* getAllClientWatcher() {
    yield takeLatest("GET_ALL_CLIENT", getAllClientEffect);
}

//to add a new client...
export function* addClientEffect(loginAction) {
    let { client } = loginAction;
    try {
        const { status, data } = yield call(addClientApi, client);
        if (status === 200 && data !== undefined) {
            yield put(addClientSuccess(data));
            yield put(openModal({ initialVal: {}, isOpen: false }));
        } else {
            yield put(addClientFailure(data.message));
        }
    } catch {
        yield put(addClientFailure());
    }
}

export function* addClientWatcher() {
    yield takeLatest("ADD_CLIENT", addClientEffect);
}

//to udpate existing client...
export function* updateClientEffect(loginAction) {
    let { client } = loginAction;
    try {
        const { status, data } = yield call(updateClientApi, client);
        if (status === 200 && data !== undefined) {
            yield put(updateClientSuccess(data));
            yield put(openModal({ initialVal: {}, isOpen: false }));
        } else {
            yield put(updateClientFailure(data.message));
        }
    } catch {
        yield put(updateClientFailure());
    }
}

export function* updateClientWatcher() {
    yield takeLatest("UPDATE_CLIENT", updateClientEffect);
}

export function* deleteClientEffect(id) {
    const { clientId } = id;
    console.log("id... for deleting the Client...", clientId);
    try {
        const { status, data } = yield call(deleteClientApi, clientId);
        if (status === 200 && data !== undefined) {
            yield put(deleteClientSuccess(clientId));
        } else {
            yield put(deleteClientFailure(data));
        }
    } catch (e) {
        yield put(deleteClientFailure());
    }
}

export function* deleteClientWatcher() {
    yield takeLatest("DELETE_CLIENT", deleteClientEffect);
}
