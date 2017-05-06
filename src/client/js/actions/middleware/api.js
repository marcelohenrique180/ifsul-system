const BASE_URL = 'http://localhost:8080/api/';

export const CALL_API = Symbol('Call API');

export function callApi(endpoint, customConfig, authenticated) {

    let token = localStorage.getItem('id_token') || null;
    let config = customConfig || {};

    if(authenticated) {
        if(token) {
            config.headers = Object.assign({}, config.headers, {
                'Authorization': token
            })
        }
        else {
            throw "No token saved!"
        }
    }

    return doFetch(endpoint, config)
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}

// Realiza Fetch
function doFetch(endpoint, config) {
    const url = BASE_URL + endpoint.replace(BASE_URL, "");

    return fetch(url, config)
        .then(status)
        .then(json)
        .then( data => {
            console.log('Request succeeded with JSON response', data);
            return data;
        }).catch( error => {
            console.log('Request failed', error);
        });
}

export default store => next => action => {

    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated, config } = callAPI;

    const [ requestType, successType, errorType ] = types;

    next({type: requestType});
    return callApi(endpoint, config, authenticated).then(
        response =>
            next({
                response,
                authenticated,
                type: successType
            }),
        error => next({
            errorMessage: error.message || 'There was an error.',
            type: errorType
        })
    )
}