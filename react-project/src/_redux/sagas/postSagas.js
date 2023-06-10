import { push } from "connected-react-router";
import { takeLatest, call, put, fork } from "redux-saga/effects";
import { GET_POSTS_REQUESTED, LOGIN_REQUESTED, REGISTER_REQUESTED } from "../actionTypes";
import { loginFailed, loginSucceeded, registerFailed, registerSucceeded } from "../actions/userActions";
import { _get, _post } from "../../constants/httpHelper"
import { message } from "antd"
import { getPostsFailed, getPostsSucceeded } from "../actions/postActions";
export const postSagas = [
    fork(watchGetPostsRequestedSaga),
];

export function* watchGetPostsRequestedSaga() {
    yield takeLatest(GET_POSTS_REQUESTED, workerGetPostsRequestedSaga);
}
export function* workerGetPostsRequestedSaga(action) {
    try {
        const {page, pageSize} = action.payload;
        const { data } = yield call(() => _get(`/api/posts?page=${page}&pageSize=${pageSize}`));
        yield put(getPostsSucceeded(data));
    } catch (error) {
        message.error("Posts cannot be retrieved!")
        yield put(getPostsFailed(error));
    }
}