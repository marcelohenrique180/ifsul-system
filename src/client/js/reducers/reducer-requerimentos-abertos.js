import {
    RECEIVE_REQUERIMENTOS_ABERTOS,
    REQUEST_REQUERIMENTOS_ABERTOS,
    FAILURE_REQUERIMENTOS_ABERTOS
} from '../actions/requerimento'

export function requerimentosAbertosReducer(
    state = {
        isFetching: false,
        error: false,
        fetched: false,
        requerimentos_abertos: {},
        errorMessage: ''
    },action
) {
    switch (action.type){
        case RECEIVE_REQUERIMENTOS_ABERTOS:
            return Object.assign({}, state,{
                isFetching: false,
                error: false,
                fetched: true,
                requerimentos_abertos: action.response,
                errorMessage: ''
            });
        case FAILURE_REQUERIMENTOS_ABERTOS:
            return Object.assign({}, state,{
                isFetching: false,
                error: true,
                fetched: false,
                requerimentos_abertos: {},
                errorMessage: action.errorMessage
            });
        case REQUEST_REQUERIMENTOS_ABERTOS:
            return Object.assign({}, state,{
                isFetching: true,
                error: false,
                fetched: false,
                requerimentos_abertos: {},
                errorMessage: ''
            });
        default:
            return state
    }
}