// @flow

import genericReducer, { defaultState, StateType, ActionType } from './generic-reducer'

import {
  REQUEST_SEND_TIPO,
  RECEIVE_SEND_TIPO,
  FAILURE_SEND_TIPO,
  RESET_TIPO
} from '../actions/tipo'

export function tiposReducer (state: StateType = defaultState, action: ActionType): StateType {
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
