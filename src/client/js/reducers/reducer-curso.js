// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  REQUEST_SEND_CURSO,
  RECEIVE_SEND_CURSO,
  FAILURE_SEND_CURSO,
  RESET_CURSO
} from '../actions/curso'

export function cursosReducer(
  state: State = defaultState,
  action: Action
): State {
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
