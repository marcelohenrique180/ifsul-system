import {
    FAILURE_SEND_ALUNO,
    RECEIVE_SEND_ALUNO,
    REQUEST_SEND_ALUNO
} from '../actions/aluno'

export function alunoReducer(
    state = {
        isFetching: false,
        error: false,
        fetched: false,
        aluno: {},
        errorMessage: ''
    },action
){
    switch (action.type){
        case FAILURE_SEND_ALUNO:
            return Object.assign({}, state,{
                isFetching: false,
                error: true,
                fetched: false,
                aluno: {},
                errorMessage: action.errorMessage
            });
        case RECEIVE_SEND_ALUNO:
            return Object.assign({}, state,{
                isFetching: false,
                error: false,
                fetched: true,
                aluno: action.response,
                errorMessage: ''
            });
        case REQUEST_SEND_ALUNO:
            return Object.assign({}, state,{
                isFetching: true,
                error: false,
                fetched: false,
                aluno: {},
                errorMessage: ''
            });
        default:
            return state
    }
}