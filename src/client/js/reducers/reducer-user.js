// @flow

import {
  FAILURE_LOGIN,
  RECEIVE_LOGIN,
  RECEIVE_LOGOUT,
  REQUEST_LOGIN
} from '../actions'
import type { State, Usuario } from './types/index'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function usuarioReducer(
  state: State<Usuario> = defaultState,
  action: Action<Usuario>
): State<Usuario> {
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
