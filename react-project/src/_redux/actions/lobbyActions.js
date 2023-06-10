import { LOCALE_CHANGE } from "../actionTypes";

export const localeChange = (locale) => ({
    type: LOCALE_CHANGE,
    payload: locale
});