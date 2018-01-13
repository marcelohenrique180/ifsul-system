// @flow

import { CALL_API } from './middleware/api'
export const REQUEST_REQUERIMENTO: string = 'REQUEST_REQUERIMENTO'
export const RECEIVE_REQUERIMENTO: string = 'RECEIVE_REQUERIMENTO'
export const FAILURE_REQUERIMENTO: string = 'FAILURE_REQUERIMENTO'
export const REQUEST_REQUERIMENTO_PAGE: string = 'REQUEST_REQUERIMENTO_PAGE'
export const RECEIVE_REQUERIMENTO_PAGE: string = 'RECEIVE_REQUERIMENTO_PAGE'
export const FAILURE_REQUERIMENTO_PAGE: string = 'FAILURE_REQUERIMENTO_PAGE'
export const REQUEST_REQUERIMENTOS_ABERTOS: string =
  'REQUEST_REQUERIMENTOS_ABERTOS'
export const RECEIVE_REQUERIMENTOS_ABERTOS: string =
  'RECEIVE_REQUERIMENTOS_ABERTOS'
export const FAILURE_REQUERIMENTOS_ABERTOS: string =
  'FAILURE_REQUERIMENTOS_ABERTOS'
export const RESET_REQUERIMENTO: string = 'RESET_REQUERIMENTO'

export function resetRequerimento() {
  return {
    type: RESET_REQUERIMENTO
  }
}

export function sendRequerimento(requerimento) {
  return {
    [CALL_API]: {
      endpoint: 'requerimentos',
      authenticated: true,
      types: [REQUEST_REQUERIMENTO, RECEIVE_REQUERIMENTO, FAILURE_REQUERIMENTO],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(requerimento)
      }
    }
  }
}

export function getRequerimento(id) {
  return {
    [CALL_API]: {
      endpoint: 'requerimentos/' + id,
      authenticated: true,
      types: [REQUEST_REQUERIMENTO, RECEIVE_REQUERIMENTO, FAILURE_REQUERIMENTO],
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

export function getRequerimentoByPage(page) {
  return {
    [CALL_API]: {
      endpoint: page,
      authenticated: true,
      types: [
        REQUEST_REQUERIMENTO_PAGE,
        RECEIVE_REQUERIMENTO_PAGE,
        FAILURE_REQUERIMENTO_PAGE
      ],
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

export function getRequerimentosEmAberto() {
  return {
    [CALL_API]: {
      endpoint: 'requerimentos/search/findRequerimentosByParecerIsNull',
      authenticated: true,
      types: [
        REQUEST_REQUERIMENTOS_ABERTOS,
        RECEIVE_REQUERIMENTOS_ABERTOS,
        FAILURE_REQUERIMENTOS_ABERTOS
      ],
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
