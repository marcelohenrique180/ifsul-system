// @flow

import type { AlunoUsuario, Case, State } from './types'
import {
  FAILURE_ALUNO_SENHA,
  RECEIVE_ALUNO_SENHA,
  REQUEST_ALUNO_SENHA
} from '../actions/aluno'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function alunoUsuarioReducer(
  state: State<AlunoUsuario> = defaultState,
  action: Action<AlunoUsuario>
): State<AlunoUsuario> {
  const cases: Case = {
    request: REQUEST_ALUNO_SENHA,
    receive: RECEIVE_ALUNO_SENHA,
    failure: FAILURE_ALUNO_SENHA
  }

  return genericReducer(state, action, cases)
}
