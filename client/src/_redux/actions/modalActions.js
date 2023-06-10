import { SHOW_MODAL, HIDE_MODAL, CONFIRM_YES, CONFIRM_NO } from "../actionTypes";

export const showModal = (modalType, modalProps) => ({
    type: SHOW_MODAL,
    payload: {modalType, modalProps}
});
export const hideModal = () => ({
    type: HIDE_MODAL,
});

export const confirmYes = () => ({
    type: CONFIRM_YES
});

export const confirmNo = () => ({
    type: CONFIRM_NO
});
