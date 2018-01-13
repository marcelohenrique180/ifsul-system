// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import type { RequerimentoType } from './reducer-requerimento'
import type { PageType } from '../util'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_REQUERIMENTOS_ABERTOS,
  REQUEST_REQUERIMENTOS_ABERTOS,
  FAILURE_REQUERIMENTOS_ABERTOS
} from '../actions/requerimento'

export type RequerimentoAbertoType = {
  _embedded: Array<RequerimentoType>
}

export function requerimentosAbertosReducer(
  state: State<?RequerimentoAbertoType> = defaultState,
  action: Action
): State<?RequerimentoAbertoType> {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTOS_ABERTOS,
    receive: RECEIVE_REQUERIMENTOS_ABERTOS,
    failure: FAILURE_REQUERIMENTOS_ABERTOS
  })
}
