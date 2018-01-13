// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_SEND_REQUERIMENTO,
  REQUEST_SEND_REQUERIMENTO,
  FAILURE_SEND_REQUERIMENTO,
  RESET_REQUERIMENTO
} from '../actions/requerimento'

export function requerimentoReducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case RESET_REQUERIMENTO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_SEND_REQUERIMENTO,
        receive: RECEIVE_SEND_REQUERIMENTO,
        failure: FAILURE_SEND_REQUERIMENTO
      })
  }
}
