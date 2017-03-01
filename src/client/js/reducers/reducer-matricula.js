import {
    FAILURE_SEND_ALUNO_MATRICULA,
    RECEIVE_SEND_ALUNO_MATRICULA,
    REQUEST_SEND_ALUNO_MATRICULA
} from '../actions/aluno'

export function matriculaReducer(state = {
    isFetching: false,
    errorMessage: ''
}, action){

    switch (action.type) {
        case REQUEST_SEND_ALUNO_MATRICULA:
            return Object.assign({}, state, {
                isFetching: true,
                matricula: action.response
            });
            break;
        case RECEIVE_SEND_ALUNO_MATRICULA:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case FAILURE_SEND_ALUNO_MATRICULA:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.error
            });
        default:
            return state
    }
}