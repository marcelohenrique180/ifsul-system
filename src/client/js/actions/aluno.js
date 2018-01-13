// @flow

import type { ActionApi } from './types'
import { CALL_API } from './middleware/api'

export const REQUEST_ALUNO_MATRICULA: string = 'REQUEST_ALUNO_MATRICULA'
export const RECEIVE_ALUNO_MATRICULA: string = 'RECEIVE_ALUNO_MATRICULA'
export const FAILURE_ALUNO_MATRICULA: string = 'FAILURE_ALUNO_MATRICULA'
export const REQUEST_ALUNO_SENHA: string = 'REQUEST_ALUNO_SENHA'
export const RECEIVE_ALUNO_SENHA: string = 'RECEIVE_ALUNO_SENHA'
export const FAILURE_ALUNO_SENHA: string = 'FAILURE_ALUNO_SENHA'
export const REQUEST_ALUNO: string = 'REQUEST_ALUNO'
export const RECEIVE_ALUNO: string = 'RECEIVE_ALUNO'
export const FAILURE_ALUNO: string = 'FAILURE_ALUNO'
export const RESET_ALUNO: string = 'RESET_ALUNO'

export function resetAluno() {
  return {
    type: RESET_ALUNO
  }
}

export function sendAlunoMatricula(matricula: string): ActionApi {
  return {
    [CALL_API]: {
      endpoint: 'cadastro/aluno',
      authenticated: false,
      types: [
        REQUEST_ALUNO_MATRICULA,
        RECEIVE_ALUNO_MATRICULA,
        FAILURE_ALUNO_MATRICULA
      ],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ matricula })
      }
    }
  }
}

export function sendAlunoSenha({ senha, token }) {
  return {
    [CALL_API]: {
      endpoint: 'cadastro/aluno/usuario',
      authenticated: false,
      types: [REQUEST_ALUNO_SENHA, RECEIVE_ALUNO_SENHA, FAILURE_ALUNO_SENHA],
      config: {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          VerificationToken: token
        },
        method: 'POST',
        body: JSON.stringify({ senha })
      }
    }
  }
}

export function requestAluno() {
  return {
    [CALL_API]: {
      endpoint: 'alunos/search/findAlunobyUsuarioEmail',
      authenticated: true,
      types: [REQUEST_ALUNO, RECEIVE_ALUNO, FAILURE_ALUNO],
      config: {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }
    }
  }
}

export function getAluno(url) {
  return {
    [CALL_API]: {
      endpoint: url || 'alunos',
      authenticated: true,
      types: [REQUEST_ALUNO, RECEIVE_ALUNO, FAILURE_ALUNO],
      config: {
        headers: {
          Accept: 'application/json'
        },
        method: 'GET'
      }
    }
  }
}
