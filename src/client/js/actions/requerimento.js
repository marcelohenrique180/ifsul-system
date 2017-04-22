export const REQUEST_SEND_REQUERIMENTO = "REQUEST_SEND_REQUERIMENTO";
export const RECEIVE_SEND_REQUERIMENTO = "RECEIVE_SEND_REQUERIMENTO";
export const FAILURE_SEND_REQUERIMENTO = "FAILURE_SEND_REQUERIMENTO";
import {CALL_API} from './middleware/api'

export function sendRequeirmento(requerimento) {
    return {
        [CALL_API]: {
            endpoint: 'requerimentos',
            authenticated: true,
            types: [REQUEST_SEND_REQUERIMENTO, RECEIVE_SEND_REQUERIMENTO, FAILURE_SEND_REQUERIMENTO],
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(requerimento)
            }
        }
    }
}

export function getRequerimento(id) {
    return {
        [CALL_API]: {
            endpoint: 'requerimentos/'+id,
            authenticated: true,
            types: [REQUEST_SEND_REQUERIMENTO, RECEIVE_SEND_REQUERIMENTO, FAILURE_SEND_REQUERIMENTO],
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "GET",
            }
        }
    }
}