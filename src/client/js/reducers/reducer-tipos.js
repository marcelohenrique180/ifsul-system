import {
    REQUEST_SEND_TIPO,
    RECEIVE_SEND_TIPO,
    FAILURE_SEND_TIPO
} from '../actions/tipo'
import {extractEmbedded} from '../util'

export function tiposReducer(
    state = {
        isFetching: false,
        error: false,
        fetched: false,
        tipo: {},
        errorMessage: ''
    },action
){
    switch (action.type){
        case FAILURE_SEND_TIPO:
            return Object.assign({}, state,{
                isFetching: false,
                error: true,
                fetched: false,
                tipo: {},
                errorMessage: action.errorMessage
            });
        case RECEIVE_SEND_TIPO:
            return Object.assign({}, state,{
                isFetching: false,
                error: false,
                fetched: true,
                tipo: extractEmbedded(action.response),
                errorMessage: ''
            });
        case REQUEST_SEND_TIPO:
            return Object.assign({}, state,{
                isFetching: true,
                error: false,
                fetched: false,
                tipo: {},
                errorMessage: ''
            });
        default:
            return state
    }
}