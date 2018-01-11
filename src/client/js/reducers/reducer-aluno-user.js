// @flow
import type { State, Action } from './generic-reducer'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_SEND_ALUNO_SENHA,
  RECEIVE_SEND_ALUNO_SENHA,
  REQUEST_SEND_ALUNO_SENHA
} from '../actions/aluno'

export function alunoUserReducer(
  state: State = defaultState,
  action: Action
): State {
  return genericReducer(state, action, {
    request: REQUEST_SEND_ALUNO_SENHA,
    receive: RECEIVE_SEND_ALUNO_SENHA,
    failure: FAILURE_SEND_ALUNO_SENHA
  })
}
