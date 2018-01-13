import { CALL_API } from './middleware/api'
export const REQUEST_CURSO: string = 'REQUEST_CURSO'
export const RECEIVE_CURSO: string = 'RECEIVE_CURSO'
export const FAILURE_CURSO: string = 'FAILURE_CURSO'
export const RESET_CURSO: string = 'RESET_CURSO'

export function resetCurso() {
  return {
    type: RESET_CURSO
  }
}

export function requestCursos(endpoint) {
  return {
    [CALL_API]: {
      endpoint,
      authenticated: true,
      types: [REQUEST_CURSO, RECEIVE_CURSO, FAILURE_CURSO],
      config: {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }
    }
  }
}
