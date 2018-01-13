// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  REQUEST_SEND_TIPO,
  RECEIVE_SEND_TIPO,
  FAILURE_SEND_TIPO,
  RESET_TIPO
} from '../actions/tipo'

export function tiposReducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case RESET_TIPO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_SEND_TIPO,
        receive: RECEIVE_SEND_TIPO,
        failure: FAILURE_SEND_TIPO
      })
  }
}
