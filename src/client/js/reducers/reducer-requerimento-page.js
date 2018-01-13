// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_REQUERIMENTO_PAGE,
  REQUEST_REQUERIMENTO_PAGE,
  FAILURE_REQUERIMENTO_PAGE
} from '../actions/requerimento'

export function requerimentoPageReducer(
  state: State = defaultState,
  action: Action
): State {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTO_PAGE,
    receive: RECEIVE_REQUERIMENTO_PAGE,
    failure: FAILURE_REQUERIMENTO_PAGE
  })
}
