// @flow

export const REQUEST_LOGIN: string = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN: string = 'RECEIVE_LOGIN'
export const FAILURE_LOGIN: string = 'FAILURE_LOGIN'
export const REQUEST_LOGOUT: string = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT: string = 'RECEIVE_LOGOUT'
export const FAILURE_LOGOUT: string = 'FAILURE_LOGOUT'

function requestLogin(creds) {
  return {
    type: REQUEST_LOGIN,
    creds
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

function failureLogin(error) {
  return {
    type: FAILURE_LOGIN,
    error: {
      isAuthenticated: false,
      message: error
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

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  return dispatch => {
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
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('role')
    dispatch(recieveLogout())
  }
}
