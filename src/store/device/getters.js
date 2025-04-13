import {GET_IP} from "../storeconstants";

export default {
    [GET_IP](state) {
        state.ipAddress = undefined;
        return state.ipAddress;
    }
}