// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  REQUEST_TIPO,
  RECEIVE_TIPO,
  FAILURE_TIPO,
  RESET_TIPO
} from '../actions/tipo'

export type TipoType = {
  tipo: string
}

export function tiposReducer(
  state: State<?TipoType> = defaultState,
  action: Action
): State<?TipoType> {
  switch (action.type) {
    case RESET_TIPO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_TIPO,
        receive: RECEIVE_TIPO,
        failure: FAILURE_TIPO
      })
  }
}
