import { all } from "redux-saga/effects";
// import {
//     addCandidateWatcher,
//     getAllCandidateWatcher,
//     deleteCandidateWatcher,
// } from "./candidate-saga";
import { loginActionWatcher } from "./login-saga";
import {
    addUserActionWatcher,
    getUserActionWatcher,
    deleteUserWatcher,
} from "./user-saga";

export default function* rootSaga() {
    yield all([
        loginActionWatcher(),
        getUserActionWatcher(),
        addUserActionWatcher(),
        deleteUserWatcher()
    ]);
}
