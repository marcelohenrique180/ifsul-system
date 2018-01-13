// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  FAILURE_ALUNO_MATRICULA,
  RECEIVE_ALUNO_MATRICULA,
  REQUEST_ALUNO_MATRICULA
} from '../actions/aluno'

import { NOVA_MATRICULA } from '../actions/matricula'

export type MatriculaType = {}

export function matriculaReducer(
  state: State<?MatriculaType> = defaultState,
  action: Action
): State<?MatriculaType> {
  switch (action.type) {
    case NOVA_MATRICULA:
      return Object.assign({}, state, {
        fetched: false
      })
    default:
      return genericReducer(state, action, {
        request: REQUEST_ALUNO_MATRICULA,
        receive: RECEIVE_ALUNO_MATRICULA,
        failure: FAILURE_ALUNO_MATRICULA
      })
  }
}
