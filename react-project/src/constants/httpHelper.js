import axios from 'axios'
const ROOT_API = import.meta.env.VITE_ROOT_API;

export function _get(actionUrl) {
    
    return axios.get(ROOT_API + actionUrl,
    {
        headers: { Pragma: 'no-cache' },
        responseType: 'json'
    });
}

export function _post(actionUrl, data) {
    return axios.post(ROOT_API + actionUrl, data,
    {
        headers: { Pragma: 'no-cache' },
        responseType: 'json'
    });
}

export function _put(actionUrl, data) {
    return axios.put(ROOT_API + actionUrl, data,
    {
        headers: { Pragma: 'no-cache' },
        responseType: 'json'
    });
}

export function _delete(actionUrl) {
    return axios.delete(ROOT_API + actionUrl,
    {
        headers: { Pragma: 'no-cache' },
        responseType: 'json'
    });
}

/*
    async function login(username, password) {
        try { 
            const resp = await _post('/api/login', {username: username, password: password});
            if (resp.status === 200) {
                // handle login
            }
        } catch (e) {
            // handle error
        }
    }
*/