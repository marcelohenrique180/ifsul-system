// @flow

import type { Action } from '../types'

export const CALL_API: string = 'Call API'

const BASE_URL = 'http://localhost:8080/api/'

export type ApiCall = {
  endpoint: string,
  types: [string, string, string],
  authenticated: boolean,
  config: Object
}

export type ApiCallWrapped = {
  [string]: ApiCall
}

type NextFunction = any => Action | Promise<*>

export function callApi(
  endpoint: string,
  customConfig: Object,
  authenticated: ?boolean
) {
  let token = localStorage.getItem('id_token') || null
  let config = customConfig || {}

  if (authenticated) {
    if (token) {
      config.headers = Object.assign({}, config.headers, {
        Authorization: token
      })
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
function doFetch(endpoint, config) {
  const url = BASE_URL + endpoint.replace(BASE_URL, '')

  return fetch(url, config)
    .then(status)
    .then(json)
    .catch(error => {
      return error.json().then(error => Promise.reject(error.message))
    })
}

export default (store: Object): Function => (next: NextFunction): Function => (
  action: ApiCallWrapped
): Action | Promise<*> => {
  const callAPI: ?ApiCall = action[CALL_API]

  if (typeof callAPI === 'undefined' || callAPI === null) {
    return next(action)
  }

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
