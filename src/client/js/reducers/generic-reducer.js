// @flow

type CaseType = {
  request: string,
  receive: string,
  failure: string
}

export type ActionType = {
  type: string,
  payload: object
}

export type StateType = {
  isFetching: boolean,
  error: boolean,
  fetched: boolean,
  payload: object,
  errorMessage: string
}

export const defaultState: StateType = {
  isFetching: false,
  error: false,
  fetched: false,
  payload: {},
  errorMessage: ''
}

export default function genericReducer (state: StateType = defaultState, action: ActionType, cases: CaseType): StateType {
  switch (action.type) {
    case cases.failure:
      return Object.assign({}, state, {
        isFetching: false,
        error: true,
        fetched: false,
        payload: {},
        errorMessage: action.errorMessage
      })
    case cases.receive:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        fetched: true,
        payload: action.response
      })
    case cases.request:
      return Object.assign({}, state, {
        isFetching: true,
        error: false,
        fetched: false
      })
    default:
      return state
  }
}
