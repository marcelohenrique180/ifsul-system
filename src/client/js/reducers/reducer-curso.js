// @flow

import type { Case, State } from './types'
import {
  FAILURE_CURSO,
  RECEIVE_CURSO,
  REQUEST_CURSO,
  RESET_CURSO
} from '../actions/curso'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'
import type { Curso } from './types/index'

export function cursosReducer(
  state: State<Curso> = defaultState,
  action: Action<Curso>
): State<Curso> {
  switch (action.type) {
    case RESET_CURSO:
      return defaultState
    default:
      return genericReducer(state, action, {
        request: REQUEST_CURSO,
        receive: RECEIVE_CURSO,
        failure: FAILURE_CURSO
      })
  }
}
