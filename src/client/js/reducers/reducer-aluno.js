// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_ALUNO,
  RECEIVE_ALUNO,
  REQUEST_ALUNO,
  RESET_ALUNO
} from '../actions/aluno'

export function alunoReducer(
  state: State = defaultState,
  action: Action
): State {
  switch (action.type) {
    case RESET_ALUNO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_ALUNO,
        receive: RECEIVE_ALUNO,
        failure: FAILURE_ALUNO
      })
  }
}
