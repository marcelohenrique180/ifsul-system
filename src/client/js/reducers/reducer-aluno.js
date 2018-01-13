// @flow

import {
  FAILURE_ALUNO,
  RECEIVE_ALUNO,
  REQUEST_ALUNO,
  RESET_ALUNO
} from '../actions/aluno'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'
import type { State } from './types'

export function alunoReducer(
  state: State<any> = defaultState,
  action: Action<any>
): State<any> {
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
