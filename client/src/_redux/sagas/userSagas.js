import { push } from "connected-react-router";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import { LOGIN_REQUESTED, REGISTER_REQUESTED } from "../actionTypes";
import { loginFailed, loginSucceeded, registerFailed, registerSucceeded } from "../actions/userActions";
import { _post } from "../../constants/httpHelper"
import { message } from "antd"
export const userSagas = [
    fork(watchLoginRequestedSaga),
    fork(watchRegisterRequestedSaga),
];

export function* watchLoginRequestedSaga() {
    yield takeLatest(LOGIN_REQUESTED, workerLoginRequestedSaga);
}

export function* workerLoginRequestedSaga(action) {
    try {
        const { data } = yield call(() => _post("/api/login", action.payload));
        yield put(loginSucceeded(data));
        yield put(push("/"));
    } catch (error) {
        message.error("Username or password incorrect!")
        yield put(loginFailed(error));
    }
};


export function* watchRegisterRequestedSaga() {
    yield takeLatest(REGISTER_REQUESTED, workerRegisterRequestedSaga);
}
export function* workerRegisterRequestedSaga(action) {
    try {
        const { data } = yield call(() => _post("/api/register", action.payload));
        yield put(registerSucceeded(data));
        yield put(push("/"));
    } catch (error) {
        message.error("Input data incorrect!")
        yield put(registerFailed(error));
    }
}
