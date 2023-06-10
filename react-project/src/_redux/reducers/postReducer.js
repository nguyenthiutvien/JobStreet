import { REHYDRATE } from "redux-persist";
import { GET_POSTS_SUCCEEDED, LOGIN_SUCCEEDED } from "../actionTypes";
import axios from "axios";
import { getCopyState } from "../../constants/common"

const defaultState = {
    posts: null
}

const postReducer = (state, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCEEDED:
            return getCopyState(state, {
                posts: action.payload
            });
        default:
            return getCopyState(state, state ? {} : defaultState);
    }
};

export default postReducer;
