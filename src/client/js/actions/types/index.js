// @flow

import type { Error } from '../../reducers/types'

export type Action = {|
  +type: string,
  +payload: ?Object,
  +error: ?Error
|}

export type ConfigApi = {
  headers: { Authentication: string },
  method: string,
  body: string
}

export type ActionApiData = {|
  endpoint: string,
  types: [string, string, string],
  authenticated: boolean,
  config: ConfigApi
|}

export type ActionApi = {
  [string]: ActionApiData
}
