import { CALL_API } from './middleware/api'
export const REQUEST_TIPO: string = 'REQUEST_TIPO'
export const RECEIVE_TIPO: string = 'RECEIVE_TIPO'
export const FAILURE_TIPO: string = 'FAILURE_TIPO'
export const RESET_TIPO: string = 'RESET_TIPO'

export function resetTipo() {
  return {
    type: RESET_TIPO
  }
}

export function requestTipos(url) {
  return {
    [CALL_API]: {
      endpoint: url || 'tipos',
      authenticated: true,
      types: [REQUEST_TIPO, RECEIVE_TIPO, FAILURE_TIPO],
      config: {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }
    }
  }
}
