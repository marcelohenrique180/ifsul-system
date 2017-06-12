export const REQUEST_SEND_PARECER = "REQUEST_SEND_PARECER";
export const RECEIVE_SEND_PARECER = "RECEIVE_SEND_PARECER";
export const FAILURE_SEND_PARECER = "FAILURE_SEND_PARECER";
import {CALL_API} from './middleware/api'
import {getId} from '../util'

export function getParecer(id) {
    return {
        [CALL_API]: {
            endpoint: 'pareceres/'+id,
            authenticated: true,
            types: [REQUEST_SEND_PARECER, RECEIVE_SEND_PARECER, FAILURE_SEND_PARECER],
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

export function getParecerByRequerimentoId(requerimento) {
    return {
        [CALL_API]: {
            endpoint: 'pareceres/search/findByRequerimentoId/?id='+getId(requerimento),
            authenticated: true,
            types: [REQUEST_SEND_PARECER, RECEIVE_SEND_PARECER, FAILURE_SEND_PARECER],
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

export function sendParecer(parecer) {
    return {
        [CALL_API]: {
            endpoint: 'pareceres',
            authenticated: true,
            types: [REQUEST_SEND_PARECER, RECEIVE_SEND_PARECER, FAILURE_SEND_PARECER],
            config: {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(parecer)
            }
        }
    }
}