import {
  REQUEST_SEND_TIPO,
  RECEIVE_SEND_TIPO,
  FAILURE_SEND_TIPO,
  RESET_TIPO
} from '../actions/tipo'
import { extractEmbedded } from '../util'

const defaultState = {
  isFetching: false,
  error: false,
  fetched: false,
  tipo: {},
  errorMessage: ''
}

export function tiposReducer (state = defaultState, action) {
  switch (action.type) {
    case FAILURE_SEND_TIPO:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        fetched: false,
        tipo: {},
        errorMessage: action.errorMessage
      })
    case RECEIVE_SEND_TIPO:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        fetched: true,
        tipo: extractEmbedded(action.response),
        errorMessage: ''
      })
    case REQUEST_SEND_TIPO:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        fetched: false,
        tipo: {},
        errorMessage: ''
      })
    case RESET_TIPO:
      return defaultState
    default:
      return state
  }
}
