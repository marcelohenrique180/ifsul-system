import {
    RECEIVE_SEND_PARECER,
    REQUEST_SEND_PARECER,
    FAILURE_SEND_PARECER
} from '../actions/parecer'

export function parecerReducer(
    state = {
        isFetching: false,
        error: false,
        fetched: false,
        parecer: {},
        errorMessage: ''
    },action
) {
    switch (action.type){
        case RECEIVE_SEND_PARECER:
            return Object.assign({}, state,{
                isFetching: false,
                error: false,
                fetched: true,
                parecer: action.response,
                errorMessage: ''
            });
        case FAILURE_SEND_PARECER:
            return Object.assign({}, state,{
                isFetching: false,
                error: true,
                fetched: false,
                parecer: {},
                errorMessage: action.errorMessage
            });
        case REQUEST_SEND_PARECER:
            return Object.assign({}, state,{
                isFetching: true,
                error: false,
                fetched: false,
                parecer: {},
                errorMessage: ''
            });
        default:
            return state
    }
}