import {
    SET_IP
} from "../storeconstants";

export default {

    [SET_IP](state, ip) {
        state.ip = ip;
    }
}