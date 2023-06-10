import moment from "moment/moment";

export const ROUTE = {
    HOME: '/',
    ABOUT: '/about',
    LOGIN: '/login',
    REGISTER: '/register',
}

export const formatDateTimeFromNow = (date) => {
    let result = "-";
    if (date) {
        result = moment.utc(date).local().fromNow();
    }
    return result;
}

export const formatDateTime = (date) => {
    let result = "-";
    if (date) {
        const format = "YYYY-MM-DD HH:mm";
        result = moment.utc(date).local().format(format);
    }
    return result;
}

export const getCopyState = (state, updatePart) => {
    return Object.assign({}, state,
        {
            ...state,
            ...updatePart
        });
}