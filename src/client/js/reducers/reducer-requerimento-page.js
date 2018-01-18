// @flow

import type { Case, State } from './types'
import {
  FAILURE_REQUERIMENTO_PAGE,
  RECEIVE_REQUERIMENTO_PAGE,
  REQUEST_REQUERIMENTO_PAGE
} from '../actions/requerimento'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'
import type { RequerimentoPage } from './types/index'

export function requerimentoPageReducer(
  state: State<RequerimentoPage> = defaultState,
  action: Action<RequerimentoPage>
): State<RequerimentoPage> {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTO_PAGE,
    receive: RECEIVE_REQUERIMENTO_PAGE,
    failure: FAILURE_REQUERIMENTO_PAGE
  })
}
