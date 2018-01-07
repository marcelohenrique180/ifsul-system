import {
  RECEIVE_SEND_REQUERIMENTO,
  REQUEST_SEND_REQUERIMENTO,
  FAILURE_SEND_REQUERIMENTO,
  RESET_REQUERIMENTO
} from '../actions/requerimento'

const defaultState = {
  isFetching: false,
  error: false,
  fetched: false,
  requerimento: {},
  errorMessage: ''
}

export function requerimentoReducer (state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_SEND_REQUERIMENTO:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        fetched: true,
        requerimento: action.response,
        errorMessage: ''
      })
    case FAILURE_SEND_REQUERIMENTO:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        fetched: false,
        requerimento: {},
        errorMessage: action.errorMessage
      })
    case REQUEST_SEND_REQUERIMENTO:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        fetched: false,
        requerimento: {},
        errorMessage: ''
      })
    case RESET_REQUERIMENTO:
      return defaultState
    default:
      return state
  }
}
