// @flow

import type { Action, State } from './generic-reducer'

import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_SEND_ALUNO_MATRICULA,
  RECEIVE_SEND_ALUNO_MATRICULA,
  REQUEST_SEND_ALUNO_MATRICULA
} from '../actions/aluno'

import { NOVA_MATRICULA } from '../actions/matricula'

export function matriculaReducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case NOVA_MATRICULA:
      return Object.assign({}, state, {
        fetched: false
      })
    default:
      return genericReducer(state, action, {
        request: REQUEST_SEND_ALUNO_MATRICULA,
        receive: RECEIVE_SEND_ALUNO_MATRICULA,
        failure: FAILURE_SEND_ALUNO_MATRICULA
      })
  }
}
