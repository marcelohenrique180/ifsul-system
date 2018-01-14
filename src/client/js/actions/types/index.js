// @flow

import { CALL_API } from '../middleware/api'
import type { Error } from '../../reducers/types'

export type Dispatch = (Action<*> | ActionApi) => Promise<Action<*>>

export type Action<T> = {
  +type: string,
  +payload?: T,
  +error?: Error
}

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
  [CALL_API: string]: ActionApiData
}
