// @flow

import type { Case, State } from './types'
import {
  FAILURE_ALUNO_MATRICULA,
  RECEIVE_ALUNO_MATRICULA,
  REQUEST_ALUNO_MATRICULA
} from '../actions/aluno'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'
import type { Matricula } from './types/index'
import { NOVA_MATRICULA } from '../actions/matricula'

export function matriculaReducer(
  state: State<Matricula> = defaultState,
  action: Action<Matricula>
): State<Matricula> {
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
