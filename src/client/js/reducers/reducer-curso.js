// @flow

import genericReducer, { defaultState, StateType} from './generic-reducer'

import {
  REQUEST_SEND_CURSO,
  RECEIVE_SEND_CURSO,
  FAILURE_SEND_CURSO,
  RESET_CURSO
} from '../actions/curso'

export function cursosReducer (state: StateType = defaultState, action: string): StateType {
  switch (action.type) {
    case RESET_CURSO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_SEND_CURSO,
        receive: RECEIVE_SEND_CURSO,
        failure: FAILURE_SEND_CURSO
      })
  }
}
