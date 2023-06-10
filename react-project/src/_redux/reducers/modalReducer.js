import { SHOW_MODAL, HIDE_MODAL } from "../actionTypes";
import { getCopyState } from "../../constants/common"
const defaultState = {
    modalType: "",
    modalProps: {},
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return getCopyState(state, action.payload)
        case HIDE_MODAL:
            return getCopyState(state, defaultState);
        default:
            return getCopyState(state, state ? {} : defaultState);
    }
};

export default modalReducer;
