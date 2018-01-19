// @flow

import {
  FAILURE_PARECER,
  RECEIVE_PARECER,
  REQUEST_PARECER
} from '../actions/parecer'
import type { Parecer, State } from './types'
import genericReducer, { defaultState } from './generic-reducer'

import type { Action } from '../actions/types'

export function parecerReducer(
  state: State<Parecer> = defaultState,
  action: Action<Parecer>
): State<Parecer> {
  return genericReducer(state, action, {
    receive: RECEIVE_PARECER,
    request: REQUEST_PARECER,
    failure: FAILURE_PARECER
  })
}
