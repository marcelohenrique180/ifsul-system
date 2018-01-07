const BASE_URL = 'http://localhost:8080/api/'

export const CALL_API = Symbol('Call API')

export function callApi (endpoint, customConfig, authenticated) {
  let token = localStorage.getItem('id_token') || null
  let config = customConfig || {}

  if (authenticated) {
    if (token) {
      config.headers = Object.assign({}, config.headers, {
        'Authorization': token
      })
    } else {
      throw new Error('No token saved!')
    }
  }

  return doFetch(endpoint, config)
}

function status (response) {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    // erro deve ser lançado para entrar em catch
    throw new (() => {
      return response // a response é retornada
    })() // TODO Review
  }
}

function json (response) {
  return response.json()
}

// Realiza Fetch
function doFetch (endpoint, config) {
  const url = BASE_URL + endpoint.replace(BASE_URL, '')

  return fetch(url, config)
    .then(status)
    .then(json)
    .catch(error => {
      return error.json().then(error => Promise.reject(error.message))
    })
}

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated, config } = callAPI

  const [requestType, successType, errorType] = types

  next({ type: requestType })
  return callApi(endpoint, config, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      errorMessage: error || 'Houve um erro.',
      type: errorType
    })
  )
}
