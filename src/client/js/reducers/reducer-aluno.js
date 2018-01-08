// @flow

import genericReducer, { defaultState, StateType, ActionType } from './generic-reducer'

import {
  FAILURE_SEND_ALUNO,
  RECEIVE_SEND_ALUNO,
  REQUEST_SEND_ALUNO,
  RESET_ALUNO
} from '../actions/aluno'

export function alunoReducer (state: StateType = defaultState, action: ActionType): StateType {
  switch (action.type) {
    case RESET_ALUNO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_SEND_ALUNO,
        receive: RECEIVE_SEND_ALUNO,
        failure: FAILURE_SEND_ALUNO
      })
  }
}
