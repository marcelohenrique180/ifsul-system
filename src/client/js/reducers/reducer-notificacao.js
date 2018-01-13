// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_SEND_NOTIFICACAO,
  RECEIVE_SEND_NOTIFICACAO,
  REQUEST_SEND_NOTIFICACAO
} from '../actions/notificacao'

export function notificacaoReducer(
  state: State = defaultState,
  action: Action
): State {
  return genericReducer(state, action, {
    request: REQUEST_SEND_NOTIFICACAO,
    receive: RECEIVE_SEND_NOTIFICACAO,
    failure: FAILURE_SEND_NOTIFICACAO
  })
}
