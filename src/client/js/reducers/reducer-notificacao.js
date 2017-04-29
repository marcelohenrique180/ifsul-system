import {
    FAILURE_SEND_NOTIFICACAO,
    RECEIVE_SEND_NOTIFICACAO,
    REQUEST_SEND_NOTIFICACAO
} from '../actions/notificacao'
import {extractEmbedded} from '../util'

export function notificacaoReducer(
    state = {
        isFetching: false,
        error: false,
        fetched: false,
        notificacao: {},
        errorMessage: ""
    },action
) {
    switch (action.type){
        case REQUEST_SEND_NOTIFICACAO:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                fetched: false,
                notificacao: {},
                errorMessage: ""
            });
        case RECEIVE_SEND_NOTIFICACAO:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                fetched: true,
                notificacao: extractEmbedded(action.response),
                errorMessage: ""
            });
        case FAILURE_SEND_NOTIFICACAO:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                fetched: false,
                notificacao: {},
                errorMessage: action.errorMessage
            })
        default:
            return state
    }
}