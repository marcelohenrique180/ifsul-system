// @flow

import type { Action, Dispatch } from '../types'

import { RECEIVE_LOGIN } from '../index'
import type { Store } from '../../reducers/types'
import { browserHistory } from 'react-router'

export default (store: Store) => (next: Dispatch) => (action: Action<*>) => {
  if (action.type === RECEIVE_LOGIN) {
    if (!action.payload) return next(action)

    const payload = (action.payload: { role: string })
    browserHistory.push('/menu/' + payload.role.toLowerCase())
  }
  return next(action)
}
