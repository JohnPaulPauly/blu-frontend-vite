import {IS_USER_AUTHENTICATED, GET_USERNAME, GET_TOKEN} from "../storeconstants";

export default {
    [IS_USER_AUTHENTICATED](state) {
        state.authenticated = undefined;
        return state.authenticated;
    },

    [GET_USERNAME](state) {
        state.username = undefined;
        return state.username;
    },

    [GET_TOKEN](state) {
        state.token = undefined;
        return state.token;
    }
}