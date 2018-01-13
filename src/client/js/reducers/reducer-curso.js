// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  REQUEST_CURSO,
  RECEIVE_CURSO,
  FAILURE_CURSO,
  RESET_CURSO
} from '../actions/curso'

export type CursoType = {
  nome: string
}

export function cursosReducer(
  state: State<?CursoType> = defaultState,
  action: Action
): State<?CursoType> {
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
