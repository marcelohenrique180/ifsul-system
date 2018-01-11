// @flow

import type { State, Action } from './generic-reducer'

import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_LOGOUT,
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  FAILURE_LOGIN
} from '../actions'

export function userReducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        payload: {}
      }
    default:
      return genericReducer(state, action, {
        receive: RECEIVE_LOGIN,
        request: REQUEST_LOGIN,
        failure: FAILURE_LOGIN
      })
  }
}
