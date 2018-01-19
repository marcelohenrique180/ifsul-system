// @flow

import type { Action, Dispatch } from './types/index'

import type { Usuario } from '../reducers/types/index'

export const REQUEST_LOGIN: string = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN: string = 'RECEIVE_LOGIN'
export const FAILURE_LOGIN: string = 'FAILURE_LOGIN'
export const REQUEST_LOGOUT: string = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT: string = 'RECEIVE_LOGOUT'
export const FAILURE_LOGOUT: string = 'FAILURE_LOGOUT'

export type LoginType = { username: string, password: string }

function requestLogin(creds: LoginType): Action<LoginType> {
  return {
    type: REQUEST_LOGIN,
    payload: creds
  }
}

function recieveLogin(user) {
  return {
    type: RECEIVE_LOGIN,
    payload: {
      isAuthenticated: true,
      idToken: user.idToken,
      role: user.role
    }
  }
}

function failureLogin(error: string): Action<{}> {
  return {
    type: FAILURE_LOGIN,
    payload: {},
    error: {
      message: error,
      status: 403
    }
  }
}

function requestLogout() {
  return {
    type: REQUEST_LOGOUT,
    payload: {
      isAuthenticated: true
    }
  }
}

function recieveLogout() {
  return {
    type: RECEIVE_LOGOUT,
    payload: {
      isAuthenticated: false
    }
  }
}

export function loginUser(
  creds: LoginType
): Dispatch => Promise<Action<Usuario>> | Action<Usuario> {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  return (dispatch: Dispatch) => {
    dispatch(requestLogin(creds))

    return fetch('http://localhost:8080/loginfilter', config)
      .then(response => {
        let idToken = response.headers.get('Authorization')
        let role = response.headers.get('role')
        const user = {
          username: creds.username,
          role,
          idToken
        }
        if (!response.ok) {
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.idToken)
          localStorage.setItem('role', user.role)
          return dispatch(recieveLogin(user))
        }
      })
      .catch(() => dispatch(failureLogin('E-mail ou Senha incorretos.')))
  }
}

export function logoutUser() {
  return (dispatch: Dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('role')
    dispatch(recieveLogout())
  }
}
