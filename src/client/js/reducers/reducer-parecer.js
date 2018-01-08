// @flow

import genericReducer, { defaultState, StateType} from './generic-reducer'

import {
  RECEIVE_SEND_PARECER,
  REQUEST_SEND_PARECER,
  FAILURE_SEND_PARECER
} from '../actions/parecer'

export function parecerReducer (state: StateType = defaultState, action: string): StateType {
  return genericReducer(state, action, {
    receive: RECEIVE_SEND_PARECER,
    request: REQUEST_SEND_PARECER,
    failure: FAILURE_SEND_PARECER
  })
}
