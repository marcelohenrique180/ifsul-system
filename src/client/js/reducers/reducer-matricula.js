import {
  FAILURE_SEND_ALUNO_MATRICULA,
  RECEIVE_SEND_ALUNO_MATRICULA,
  REQUEST_SEND_ALUNO_MATRICULA
} from '../actions/aluno'

import { NOVA_MATRICULA } from '../actions/matricula'

const defaultState = {
  isFetching: false,
  fetched: false,
  error: false,
  errorMessage: ''
}
export function matriculaReducer (state = defaultState, action) {
  switch (action.type) {
    case REQUEST_SEND_ALUNO_MATRICULA:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        fetched: false,
        errorMessage: '',
        matricula: action.response
      })
    case RECEIVE_SEND_ALUNO_MATRICULA:
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        error: false,
        errorMessage: ''
      })
    case FAILURE_SEND_ALUNO_MATRICULA:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        fetched: false,
        errorMessage: action.errorMessage
      })
    case NOVA_MATRICULA:
      return Object.assign({}, state, {
        fetched: false
      })
    default:
      return state
  }
}
