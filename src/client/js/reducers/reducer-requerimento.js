// @flow

import genericReducer, { defaultState, StateType, ActionType } from './generic-reducer'

import {
  RECEIVE_SEND_REQUERIMENTO,
  REQUEST_SEND_REQUERIMENTO,
  FAILURE_SEND_REQUERIMENTO,
  RESET_REQUERIMENTO
} from '../actions/requerimento'

export function requerimentoReducer (state: StateType = defaultState, action: ActionType): StateType {
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
