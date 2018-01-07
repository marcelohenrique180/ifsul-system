import { CALL_API } from './middleware/api'
export const REQUEST_SEND_NOTIFICACAO = 'REQUEST_SEND_NOTIFICACAO'
export const RECEIVE_SEND_NOTIFICACAO = 'RECEIVE_SEND_NOTIFICACAO'
export const FAILURE_SEND_NOTIFICACAO = 'FAILURE_SEND_NOTIFICACAO'

export function requestNotificacao () {
  return {
    [CALL_API]: {
      endpoint: 'notificacoes/search/findAllNotRead',
      authenticated: true,
      types: [REQUEST_SEND_NOTIFICACAO, RECEIVE_SEND_NOTIFICACAO, FAILURE_SEND_NOTIFICACAO],
      config: {
        headers: {
          'Accept': 'application/json'
        },
        method: 'GET'
      }
    }
  }
}
