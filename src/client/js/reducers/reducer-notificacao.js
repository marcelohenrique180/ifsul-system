// @flow

import genericReducer, { defaultState, StateType} from './generic-reducer'

import {
  FAILURE_SEND_NOTIFICACAO,
  RECEIVE_SEND_NOTIFICACAO,
  REQUEST_SEND_NOTIFICACAO
} from '../actions/notificacao'

export function notificacaoReducer (state: StateType = defaultState, action: string): StateType {
  return genericReducer(state, action, {
    request: REQUEST_SEND_NOTIFICACAO,
    receive: RECEIVE_SEND_NOTIFICACAO,
    failure: FAILURE_SEND_NOTIFICACAO
  })
}
