// @flow

import genericReducer, { defaultState, StateType, ActionType } from './generic-reducer'

import {
  FAILURE_SEND_ALUNO_SENHA,
  RECEIVE_SEND_ALUNO_SENHA,
  REQUEST_SEND_ALUNO_SENHA
} from '../actions/aluno'

export function alunoUserReducer (state: StateType = defaultState, action: ActionType): StateType {
  return genericReducer(
    state, action, {
      request: REQUEST_SEND_ALUNO_SENHA,
      receive: RECEIVE_SEND_ALUNO_SENHA,
      failure: FAILURE_SEND_ALUNO_SENHA
    }
  )
}
