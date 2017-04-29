import {
    FAILURE_SEND_ALUNO_SENHA,
    RECEIVE_SEND_ALUNO_SENHA,
    REQUEST_SEND_ALUNO_SENHA
} from '../actions/aluno'

export function alunoUserReducer(
    state = {
        isFetching: false,
        error: false,
        errorMessage: ''
    },action
) {
    switch (action.type){
        case REQUEST_SEND_ALUNO_SENHA:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
            });
        case RECEIVE_SEND_ALUNO_SENHA:
            return Object.assign({}, state, {
                isFetching: false,
                error: false
            });
        case FAILURE_SEND_ALUNO_SENHA:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}