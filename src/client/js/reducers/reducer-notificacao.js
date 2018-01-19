// @flow

import {
  FAILURE_NOTIFICACAO,
  RECEIVE_NOTIFICACAO,
  REQUEST_NOTIFICACAO
} from '../actions/notificacao'
import type { Notificacao, State } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function notificacaoReducer(
  state: State<Notificacao> = defaultState,
  action: Action<Notificacao>
): State<Notificacao> {
  return genericReducer(state, action, {
    request: REQUEST_NOTIFICACAO,
    receive: RECEIVE_NOTIFICACAO,
    failure: FAILURE_NOTIFICACAO
  })
}
