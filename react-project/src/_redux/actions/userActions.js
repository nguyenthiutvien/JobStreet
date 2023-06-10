import { LOGIN_FAILED, LOGIN_REQUESTED, LOGIN_SUCCEEDED, REGISTER_FAILED, REGISTER_REQUESTED, REGISTER_SUCCEEDED } from "../actionTypes";

export const loginRequested = (model) => ({
    type: LOGIN_REQUESTED,
    payload: model,
});
export const loginSucceeded = (model) => ({
    type: LOGIN_SUCCEEDED,
    payload: model,
});
export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    payload: error,
});

export const registerRequested = (model) => ({
    type: REGISTER_REQUESTED,
    payload: model,
});
export const registerSucceeded = (model) => ({
    type: REGISTER_SUCCEEDED,
    payload: model,
});
export const registerFailed = (error) => ({
    type: REGISTER_FAILED,
    payload: error,
});
