import { RECEIVE_LOGIN } from '../index'
import { browserHistory } from 'react-router'

export default store => next => action => {
  if (action.type === RECEIVE_LOGIN) {
    const role = action.role
    browserHistory.push('/menu/'.concat(role.toLowerCase()))
  }
  return next(action)
}
