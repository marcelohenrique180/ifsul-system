export const REQUEST_SEND_CURSO = "REQUEST_SEND_CURSO";
export const RECEIVE_SEND_CURSO = "RECEIVE_SEND_CURSO";
export const FAILURE_SEND_CURSO = "FAILURE_SEND_CURSO";
export const RESET_CURSO = "RESET_CURSO";
import { CALL_API } from './middleware/api'

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
            types: [REQUEST_SEND_CURSO, RECEIVE_SEND_CURSO, FAILURE_SEND_CURSO],
            config: {
                headers: {
                    'Accept': 'application/json'
                },
                method: "GET",
            }
        }
    }
}