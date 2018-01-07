export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const FAILURE_LOGIN = 'FAILURE_LOGIN'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'
export const FAILURE_LOGOUT = 'FAILURE_LOGOUT'

function requestLogin (creds) {
  return {
    type: REQUEST_LOGIN,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function recieveLogin (user) {
  return {
    type: RECEIVE_LOGIN,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
    role: user.role
  }
}

function failureLogin (error) {
  return {
    type: FAILURE_LOGIN,
    isFetching: false,
    isAuthenticated: false,
    error
  }
}

function requestLogout () {
  return {
    type: REQUEST_LOGOUT,
    isFetching: true,
    isAuthenticated: true
  }
}

function recieveLogout () {
  return {
    type: RECEIVE_LOGOUT,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginUser (creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creds)
  }

  return dispatch => {
    dispatch(requestLogin(creds))

    return (
      fetch('http://localhost:8080/loginfilter', config)
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
            localStorage.setItem('id_token', user.id_token)
            localStorage.setItem('role', user.role)
            dispatch(recieveLogin(user))
          }
        }).catch(() => dispatch(failureLogin('E-mail ou Senha incorretos.'))
        )
    )
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('role')
    dispatch(recieveLogout())
  }
}
