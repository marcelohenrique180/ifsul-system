// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_SEND_REQUERIMENTO_PAGE,
  REQUEST_SEND_REQUERIMENTO_PAGE,
  FAILURE_SEND_REQUERIMENTO_PAGE
} from '../actions/requerimento'

export function requerimentoPageReducer(
  state: State = defaultState,
  action: Action
): State {
  return genericReducer(state, action, {
    request: REQUEST_SEND_REQUERIMENTO_PAGE,
    receive: RECEIVE_SEND_REQUERIMENTO_PAGE,
    failure: FAILURE_SEND_REQUERIMENTO_PAGE
  })
}
