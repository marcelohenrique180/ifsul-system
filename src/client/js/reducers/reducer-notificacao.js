// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_NOTIFICACAO,
  RECEIVE_NOTIFICACAO,
  REQUEST_NOTIFICACAO
} from '../actions/notificacao'

export type NotificacaType = {}

export function notificacaoReducer(
  state: State<?NotificacaType> = defaultState,
  action: Action
): State<?NotificacaType> {
  return genericReducer(state, action, {
    request: REQUEST_NOTIFICACAO,
    receive: RECEIVE_NOTIFICACAO,
    failure: FAILURE_NOTIFICACAO
  })
}
