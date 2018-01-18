// @flow

import { CALL_API } from './middleware/api'
export const REQUEST_NOTIFICACAO: string = 'REQUEST_NOTIFICACAO'
export const RECEIVE_NOTIFICACAO: string = 'RECEIVE_NOTIFICACAO'
export const FAILURE_NOTIFICACAO: string = 'FAILURE_NOTIFICACAO'

export function requestNotificacao() {
  return {
    [CALL_API]: {
      endpoint: 'notificacoes/search/findAllNotRead',
      authenticated: true,
      types: [REQUEST_NOTIFICACAO, RECEIVE_NOTIFICACAO, FAILURE_NOTIFICACAO],
      config: {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }
    }
  }
}
