// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_REQUERIMENTO,
  REQUEST_REQUERIMENTO,
  FAILURE_REQUERIMENTO,
  RESET_REQUERIMENTO
} from '../actions/requerimento'

export type RequerimentoType = {
  data: string,
  justificativa: string,
  requerimento: string
}

export function requerimentoReducer(
  state: State<?RequerimentoType> = defaultState,
  action: Action
): State<?RequerimentoType> {
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
