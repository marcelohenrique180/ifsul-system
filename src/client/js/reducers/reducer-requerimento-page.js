// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import type { RequerimentoType } from './reducer-requerimento'
import type { PageType } from '../util'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_REQUERIMENTO_PAGE,
  REQUEST_REQUERIMENTO_PAGE,
  FAILURE_REQUERIMENTO_PAGE
} from '../actions/requerimento'

export type RequerimentoPageType = {
  page: PageType,
  _embedded: Array<RequerimentoType>
}

export function requerimentoPageReducer(
  state: State<?RequerimentoPageType> = defaultState,
  action: Action
): State<?RequerimentoPageType> {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTO_PAGE,
    receive: RECEIVE_REQUERIMENTO_PAGE,
    failure: FAILURE_REQUERIMENTO_PAGE
  })
}
