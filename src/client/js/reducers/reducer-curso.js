import {
  REQUEST_SEND_CURSO,
  RECEIVE_SEND_CURSO,
  FAILURE_SEND_CURSO,
  RESET_CURSO
} from '../actions/curso'

const defaultState = {
  isFetching: false,
  error: false,
  fetched: false,
  cursos: {},
  errorMessage: ''
}

export function cursosReducer (state = defaultState, action) {
  switch (action.type) {
    case FAILURE_SEND_CURSO:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        fetched: false,
        cursos: {},
        errorMessage: action.errorMessage
      })
    case RECEIVE_SEND_CURSO:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        fetched: true,
        cursos: action.response,
        errorMessage: ''
      })
    case REQUEST_SEND_CURSO:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        fetched: false,
        cursos: {},
        errorMessage: ''
      })
    case RESET_CURSO:
      return defaultState
    default:
      return state
  }
}
