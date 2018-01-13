// @flow

export type Case = {
  +request: string,
  +receive: string,
  +failure: string
}

export type Error = {
  +message: string,
  +status: number
}

export type State = {
  +isFetching: boolean,
  +error: boolean,
  +fetched: boolean,
  +payload: Object,
  +error: ?Error
}
