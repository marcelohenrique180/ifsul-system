//import {findGetParameter} from '../util'

export const REQUEST_SEND_ALUNO_MATRICULA = "REQUEST_SEND_ALUNO_MATRICULA";
export const RECEIVE_SEND_ALUNO_MATRICULA = "RECEIVE_SEND_ALUNO_MATRICULA";
export const FAILURE_SEND_ALUNO_MATRICULA = "FAILURE_SEND_ALUNO_MATRICULA";
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
                body: JSON.stringify(matricula)
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