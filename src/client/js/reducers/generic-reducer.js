// @flow

type CaseType = {
  request: string,
  receive: string,
  failure: string
}

export type Error = {
  +message: string,
  +status: number
}

export type Action = {
  +type: string,
  payload: Object,
  error: ?Error
}

export type State = {
  +isFetching: boolean,
  +error: boolean,
  +fetched: boolean,
  +payload: Object,
  +error: ?Error
}

export const defaultState: State = {
  isFetching: false,
  hasError: false,
  fetched: false,
  payload: {},
  error: { message: '', status: -1 }
}

export default function genericReducer(
  state: State = defaultState,
  action: Action,
  cases: CaseType
): State {
  switch (action.type) {
    case cases.failure:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        fetched: false,
        payload: {},
        error: action.error
      }
    case cases.receive:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        fetched: true,
        payload: action.payload
      }
    case cases.request:
      return {
        ...state,
        isFetching: true,
        hasError: false,
        fetched: false
      }
    default:
      return state
  }
}
