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

// Realiza Fetch
function doFetch(endpoint, config) {
    return fetch(BASE_URL + endpoint.replace(BASE_URL, ""), config)
        .then(response => response.json()
            .then(text => ({ text, response }))
        ).then(({ text, response }) => {
        if (!response.ok) {
            return Promise.reject(text)
        }


        return text
    })
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