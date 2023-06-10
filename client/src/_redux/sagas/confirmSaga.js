import { takeEvery, takeLatest, take, put, call, fork, all, race } from 'redux-saga/effects'
import { ModalType } from '../../constants/enum';
import { hideModal, showModal } from '../actions/modalActions';
import { CONFIRM_YES, CONFIRM_NO } from '../actionTypes';

export function* confirmSaga(confirmationMessage) {
    yield put(showModal(ModalType.CONFIRM, { message: confirmationMessage }));
    const { yes } = yield race({
        yes: take(CONFIRM_YES),
        no: take(CONFIRM_NO)
    })
    yield put(hideModal());
    return !!yes;
}