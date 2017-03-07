//import {findGetParameter} from '../util'

export const REQUEST_SEND_ALUNO_MATRICULA = "REQUEST_SEND_ALUNO_MATRICULA";
export const RECEIVE_SEND_ALUNO_MATRICULA = "RECEIVE_SEND_ALUNO_MATRICULA";
export const FAILURE_SEND_ALUNO_MATRICULA = "FAILURE_SEND_ALUNO_MATRICULA";
export const REQUEST_SEND_ALUNO_SENHA = "REQUEST_SEND_ALUNO_SENHA";
export const RECEIVE_SEND_ALUNO_SENHA = "RECEIVE_SEND_ALUNO_SENHA";
export const FAILURE_SEND_ALUNO_SENHA = "FAILURE_SEND_ALUNO_SENHA";
export const REQUEST_SEND_ALUNO = "REQUEST_SEND_ALUNO";
export const RECEIVE_SEND_ALUNO = "RECEIVE_SEND_ALUNO";
export const FAILURE_SEND_ALUNO = "FAILURE_SEND_ALUNO";
import { CALL_API} from './middleware/api'

export function sendAlunoMatricula(matricula) {
    return {
        [CALL_API]: {
            endpoint: 'cadastro/aluno',
            authenticated: false,
            types: [REQUEST_SEND_ALUNO_MATRICULA, RECEIVE_SEND_ALUNO_MATRICULA, FAILURE_SEND_ALUNO_MATRICULA],
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({matricula})
            }
        }
    }
}

export function sendAlunoSenha({senha, token}) {
    return {
        [CALL_API]: {
            endpoint: 'cadastro/aluno/usuario',
            authenticated: false,
            types: [REQUEST_SEND_ALUNO_SENHA, RECEIVE_SEND_ALUNO_SENHA, FAILURE_SEND_ALUNO_SENHA],
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'VerificationToken': token
                },
                method: "POST",
                body: JSON.stringify({senha})
            }
        }
    }
}

export function requestAluno() {
    return {
        [CALL_API]: {
            endpoint: 'alunos/search/findAlunobyUsuarioEmail',
            authenticated: true,
            types: [REQUEST_SEND_ALUNO, RECEIVE_SEND_ALUNO, FAILURE_SEND_ALUNO],
            config: {
                headers: {
                    'Accept': 'application/json'
                },
                method: "GET",
            }
        }
    }
}

/*
export const REQUEST_SEND_ALUNOS = "REQUEST_SEND_ALUNOS";
export const RECEIVE_SEND_ALUNOS = "RECEIVE_SEND_ALUNOS";
export const FAILURE_SEND_ALUNOS = "FAILURE_SEND_ALUNOS";
export function sendAluno(aluno) {
    return {
        [CALL_API]: {
            endpoint: "alunos",
            types: [REQUEST_SEND_ALUNOS, RECEIVE_SEND_ALUNOS, FAILURE_SEND_ALUNOS],
            config: {
                body: JSON.stringify(aluno),
                method: "POST",
                headers: {
                    'token': findGetParameter("token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        }
    }
}*/