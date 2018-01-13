// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_NOTIFICACAO,
  RECEIVE_NOTIFICACAO,
  REQUEST_NOTIFICACAO
} from '../actions/notificacao'

export function notificacaoReducer(
  state: State = defaultState,
  action: Action
): State {
  return genericReducer(state, action, {
    request: REQUEST_NOTIFICACAO,
    receive: RECEIVE_NOTIFICACAO,
    failure: FAILURE_NOTIFICACAO
  })
}
