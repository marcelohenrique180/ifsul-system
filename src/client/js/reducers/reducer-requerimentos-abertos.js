// @flow

import genericReducer, { defaultState, StateType} from './generic-reducer'

import {
  RECEIVE_REQUERIMENTOS_ABERTOS,
  REQUEST_REQUERIMENTOS_ABERTOS,
  FAILURE_REQUERIMENTOS_ABERTOS
} from '../actions/requerimento'

export function requerimentosAbertosReducer (state: StateType = defaultState, action: string): StateType {
  return genericReducer(state, action, {
    request: REQUEST_REQUERIMENTOS_ABERTOS,
    receive: RECEIVE_REQUERIMENTOS_ABERTOS,
    failure: FAILURE_REQUERIMENTOS_ABERTOS
  })
}
