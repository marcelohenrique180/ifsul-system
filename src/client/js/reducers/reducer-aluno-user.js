// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_ALUNO_SENHA,
  RECEIVE_ALUNO_SENHA,
  REQUEST_ALUNO_SENHA
} from '../actions/aluno'

export type AlunoUsuarioType = {}

export function alunoUsuarioReducer(
  state: State<?AlunoUsuarioType> = defaultState,
  action: Action
): State<?AlunoUsuarioType> {
  const cases: Case = {
    request: REQUEST_ALUNO_SENHA,
    receive: RECEIVE_ALUNO_SENHA,
    failure: FAILURE_ALUNO_SENHA
  }

  return genericReducer(state, action, cases)
}
