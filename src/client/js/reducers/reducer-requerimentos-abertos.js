// @flow

import {
  FAILURE_REQUERIMENTOS_ABERTOS,
  RECEIVE_REQUERIMENTOS_ABERTOS,
  REQUEST_REQUERIMENTOS_ABERTOS
} from '../actions/requerimento'
import type { RequerimentoAberto, State } from './types/index'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function requerimentosAbertosReducer(
  state: State<RequerimentoAberto> = defaultState,
  action: Action<RequerimentoAberto>
): State<RequerimentoAberto> {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTOS_ABERTOS,
    receive: RECEIVE_REQUERIMENTOS_ABERTOS,
    failure: FAILURE_REQUERIMENTOS_ABERTOS
  })
}
