import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, DELETE_ACCOUNT, GET_PROFILES, GET_REPOS } from "../actions/types";

const inititalState = {
    profile: null,
    // listing on showing profile page
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = inititalState, action) {
    // destructor
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile:null
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
};