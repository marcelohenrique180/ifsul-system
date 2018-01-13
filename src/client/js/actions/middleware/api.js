// @flow

import type { Action, ActionApi, ActionApiData, ConfigApi } from '../types'

export const CALL_API: string = 'Call API'

const BASE_URL = 'http://localhost:8080/api/'

type NextFunction = any => Action | Promise<*>

export function callApi(
  endpoint: string,
  customConfig: ConfigApi,
  authenticated: ?boolean
) {
  let config: ConfigApi = customConfig || {}

  if (authenticated) {
    let token: ?string = localStorage.getItem('id_token') || null

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: token
      }
    } else {
      throw new Error('No token saved!')
    }
  }

  return doFetch(endpoint, config)
}

function status(response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

function json(response) {
  return response.json()
}

// Realiza Fetch
function doFetch(endpoint: string, config: ConfigApi) {
  const url = BASE_URL + endpoint.replace(BASE_URL, '')

  return fetch(url, ((config: Object): RequestOptions))
    .then(status)
    .then(json)
    .catch((error: Response) => {
      return error
        .json()
        .then((error: { message: string }) => Promise.reject(error.message))
    })
}

export default (store: Object): Function => (next: NextFunction): Function => (
  action: ActionApi
): Action | Promise<Action> => {
  const callAPI: ?ActionApiData = action[CALL_API]

  if (typeof callAPI === 'undefined' || callAPI === null) return next(action)

  let { endpoint, types, authenticated, config } = callAPI

  const [requestType, successType, errorType] = types

  next({ type: requestType })
  return callApi(endpoint, config, authenticated).then(
    (response: Object) =>
      next({
        payload: response,
        authenticated,
        type: successType
      }),
    (error: Object) =>
      next({
        error: {
          message: error || 'Houve um erro.',
          status: 400
        },
        type: errorType
      })
  )
}
