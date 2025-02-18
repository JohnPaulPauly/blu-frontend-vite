import {
    SET_AUTHENTICATION, SET_TOKEN,
    SET_USERNAME
} from "../storeconstants";

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
    },
    [SET_USERNAME](state, username) {
        state.username = username
    },
    [SET_TOKEN](state, token) {
        state.token = token
    },
}