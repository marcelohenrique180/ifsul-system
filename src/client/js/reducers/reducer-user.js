import {
  RECEIVE_LOGOUT,
  RECEIVE_LOGIN,
  REQUEST_LOGIN,
  FAILURE_LOGIN
} from '../actions'

export function userReducer (state = {
  isFetching: false,
  errorMessage: '',
  role: localStorage.getItem('role'),
  isAuthenticated: !!localStorage.getItem('id_token')
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: '',
        user: action.creds
      })
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        role: action.role,
        user: {
          password: ''
        }
      })
    case FAILURE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error,
        user: {
          password: ''
        }
      })
    case RECEIVE_LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
        role: ''
      })
    default:
      return state
  }
}
