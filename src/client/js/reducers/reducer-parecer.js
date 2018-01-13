// @flow

import type { Action } from '../actions/types'
import type { State, Case } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import {
  RECEIVE_PARECER,
  REQUEST_PARECER,
  FAILURE_PARECER
} from '../actions/parecer'

export function parecerReducer(
  state: State<?ParecerType> = defaultState,
  action: Action
): State<?ParecerType> {
  return genericReducer(state, action, {
    receive: RECEIVE_PARECER,
    request: REQUEST_PARECER,
    failure: FAILURE_PARECER
  })
}
