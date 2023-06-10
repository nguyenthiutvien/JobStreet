import { all } from 'redux-saga/effects'
import { userSagas } from './userSagas'
import { postSagas } from './postSagas'

export default function* rootSaga() {
    yield all([
        ...userSagas,
        ...postSagas
    ])
}