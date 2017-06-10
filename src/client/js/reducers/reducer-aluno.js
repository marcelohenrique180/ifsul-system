import {
    FAILURE_SEND_ALUNO,
    RECEIVE_SEND_ALUNO,
    REQUEST_SEND_ALUNO,
    RESET_ALUNO
} from '../actions/aluno'

const defaultState = {
    isFetching: false,
    error: false,
    fetched: false,
    aluno: {},
    errorMessage: ''
};

export function alunoReducer(state = defaultState, action){
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
        case RESET_ALUNO:
            return defaultState;
        default:
            return state
    }
}