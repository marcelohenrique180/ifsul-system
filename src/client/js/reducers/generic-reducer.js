// @flow

import type { Case, State } from './types'

import type { Action } from '../actions/types'

export const defaultState: State<any> = {
  isFetching: false,
  hasError: false,
  fetched: false,
  payload: {},
  error: { message: '', status: -1 }
}

export default function genericReducer(
  state: State<*> = defaultState,
  action: Action<any>,
  cases: Case
): State<*> {
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
