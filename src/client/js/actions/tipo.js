export const REQUEST_SEND_TIPO = "REQUEST_SEND_TIPO";
export const RECEIVE_SEND_TIPO = "RECEIVE_SEND_TIPO";
export const FAILURE_SEND_TIPO = "FAILURE_SEND_TIPO";
import { CALL_API} from './middleware/api'

export function requestTipos() {
    return {
        [CALL_API]: {
            endpoint: 'tipos',
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