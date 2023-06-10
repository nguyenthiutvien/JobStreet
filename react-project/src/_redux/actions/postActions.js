import { GET_POSTS_FAILED, GET_POSTS_REQUESTED, GET_POSTS_SUCCEEDED } from "../actionTypes";


export const getPostsRequested = (model) => ({
    type: GET_POSTS_REQUESTED,
    payload: model,
});
export const getPostsSucceeded = (model) => ({
    type: GET_POSTS_SUCCEEDED,
    payload: model,
});
export const getPostsFailed = (error) => ({
    type: GET_POSTS_FAILED,
    payload: error,
});
