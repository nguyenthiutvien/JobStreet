import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import loadingReducer from './loadingReducer'
import modalReducer from './modalReducer'
import userReducer from './userReducers'
import postReducer from './postReducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    loading: loadingReducer,
    modal: modalReducer,
    user: userReducer,
    post: postReducer
})