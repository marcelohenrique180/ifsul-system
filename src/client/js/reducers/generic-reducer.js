// @flow

import type { Action } from '../actions/types'
import type { Case, Error, State } from './types'

export const defaultState: State<*> = {
  isFetching: false,
  hasError: false,
  fetched: false,
  payload: {},
  error: { message: '', status: -1 }
}

export default function genericReducer(
  state: State<?Object> = defaultState,
  action: Action,
  cases: Case
): State<?Object> {
  switch (action.type) {
    case cases.failure:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        fetched: false,
        payload: {},
        error: action.error
      }
    case cases.receive:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        fetched: true,
        payload: action.payload
      }
    case cases.request:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        fetched: false
      }
    default:
      return state
  }
}
