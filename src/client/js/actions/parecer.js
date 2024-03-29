// @flow

import type { ActionApi } from './types/index'
import { CALL_API } from './middleware/api'
import type { Parecer } from '../reducers/types/index'

export const REQUEST_PARECER: string = 'REQUEST_PARECER'
export const RECEIVE_PARECER: string = 'RECEIVE_PARECER'
export const FAILURE_PARECER: string = 'FAILURE_PARECER'

export function getParecer(id: string): ActionApi {
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

export function getParecerByRequerimentoId(requerimento: string): ActionApi {
  return {
    [CALL_API]: {
      endpoint: 'pareceres/search/findByRequerimentoId/?id=' + requerimento,
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

export function sendParecer(parecer: Parecer): ActionApi {
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
