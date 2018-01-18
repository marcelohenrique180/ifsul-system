// @flow

import type { Case, State } from './types'
import {
  FAILURE_TIPO,
  RECEIVE_TIPO,
  REQUEST_TIPO,
  RESET_TIPO
} from '../actions/tipo'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'
import type { Tipo } from './types/index'

export function tiposReducer(
  state: State<Tipo> = defaultState,
  action: Action<Tipo>
): State<Tipo> {
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
