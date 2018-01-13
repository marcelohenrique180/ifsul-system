import { CALL_API } from './middleware/api'
import { getId } from '../util'
export const REQUEST_PARECER: string = 'REQUEST_PARECER'
export const RECEIVE_PARECER: string = 'RECEIVE_PARECER'
export const FAILURE_PARECER: string = 'FAILURE_PARECER'

export function getParecer(id) {
  return {
    [CALL_API]: {
      endpoint: 'pareceres/' + id,
      authenticated: true,
      types: [REQUEST_PARECER, RECEIVE_PARECER, FAILURE_PARECER],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      }
    }
  }
}

export function getParecerByRequerimentoId(requerimento) {
  return {
    [CALL_API]: {
      endpoint:
        'pareceres/search/findByRequerimentoId/?id=' + getId(requerimento),
      authenticated: true,
      types: [REQUEST_PARECER, RECEIVE_PARECER, FAILURE_PARECER],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      }
    }
  }
}

export function sendParecer(parecer) {
  return {
    [CALL_API]: {
      endpoint: 'pareceres',
      authenticated: true,
      types: [REQUEST_PARECER, RECEIVE_PARECER, FAILURE_PARECER],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(parecer)
      }
    }
  }
}
