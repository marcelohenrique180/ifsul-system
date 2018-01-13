// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_LOGOUT,
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  FAILURE_LOGIN
} from '../actions'

export function usuarioReducer(
  state: State<?UsuarioType> = defaultState,
  action: Action
): State<?UsuarioType> {
  switch (action.type) {
    case RECEIVE_LOGOUT:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasError: false,
        payload: {
          idToken: '',
          role: '',
          isAuthenticated: false
        }
      }
    default:
      return genericReducer(state, action, {
        receive: RECEIVE_LOGIN,
        request: REQUEST_LOGIN,
        failure: FAILURE_LOGIN
      })
  }
}
