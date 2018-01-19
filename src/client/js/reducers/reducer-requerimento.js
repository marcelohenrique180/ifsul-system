// @flow

import {
  FAILURE_REQUERIMENTO,
  RECEIVE_REQUERIMENTO,
  REQUEST_REQUERIMENTO,
  RESET_REQUERIMENTO
} from '../actions/requerimento'
import type { Requerimento, State } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function requerimentoReducer(
  state: State<Requerimento> = defaultState,
  action: Action<Requerimento>
): State<Requerimento> {
  switch (action.type) {
    case RESET_REQUERIMENTO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_REQUERIMENTO,
        receive: RECEIVE_REQUERIMENTO,
        failure: FAILURE_REQUERIMENTO
      })
  }
}
