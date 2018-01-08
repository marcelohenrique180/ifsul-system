// @flow

import genericReducer, { defaultState, StateType} from './generic-reducer'

import {
  RECEIVE_SEND_REQUERIMENTO_PAGE,
  REQUEST_SEND_REQUERIMENTO_PAGE,
  FAILURE_SEND_REQUERIMENTO_PAGE
} from '../actions/requerimento'

export function requerimentoPageReducer (state: StateType = defaultState, action: string): StateType {
  return genericReducer(state, action, {
    request: REQUEST_SEND_REQUERIMENTO_PAGE,
    receive: RECEIVE_SEND_REQUERIMENTO_PAGE,
    failure: FAILURE_SEND_REQUERIMENTO_PAGE
  })
}
