import { REHYDRATE } from "redux-persist";
import { LOGIN_SUCCEEDED } from "../actionTypes";
import axios from "axios";
import { getCopyState } from "../../constants/common"

const defaultState = {
    token: '',
    user: null
}

const userReducer = (state, action) => {
    switch (action.type) {
        case REHYDRATE:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.payload?.user?.token;
            return getCopyState(
                state,
                action.payload?.user?.token ? { ...action.payload?.user } : {}
            );
        case LOGIN_SUCCEEDED:
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + action.payload?.authorisation?.token;
            return getCopyState(state, {
                token: action.payload?.authorisation?.token,
                user: action.payload?.user
            });
        default:
            return getCopyState(state, state ? {} : defaultState);
    }
};

export default userReducer;
