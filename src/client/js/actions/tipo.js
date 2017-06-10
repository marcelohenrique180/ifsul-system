export const REQUEST_SEND_TIPO = "REQUEST_SEND_TIPO";
export const RECEIVE_SEND_TIPO = "RECEIVE_SEND_TIPO";
export const FAILURE_SEND_TIPO = "FAILURE_SEND_TIPO";
export const RESET_TIPO = "RESET_TIPO";
import { CALL_API} from './middleware/api'

export function resetTipo() {
    return {
        type: RESET_TIPO
    }
}

export function requestTipos(url) {
    return {
        [CALL_API]: {
            endpoint: url || 'tipos',
            authenticated: true,
            types: [REQUEST_SEND_TIPO, RECEIVE_SEND_TIPO, FAILURE_SEND_TIPO],
            config: {
                headers: {
                    'Accept': 'application/json'
                },
                method: "GET",
            }
        }
    }
}