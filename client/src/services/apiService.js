import { parseJwt } from './jwt'

const baseUrl = "http://localhost:5000"
async function postData(url = '', data = {}, headers = {}, method = 'POST') {
    let request = {
        method: method || 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        referrerPolicy: 'no-referrer',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    }

    if(['POST', 'PUT'].includes(request.method)) {
        request.body = JSON.stringify(data);
    }
    const response = await fetch(`${baseUrl}${url}`, request);
    return response; // parses JSON response into native JavaScript objects
}

const apiService = {
    get headers() {
        const token = localStorage.getItem('token')
        return {
            'Authorization': `Bearer ${token}`
        }
    },
    async login(userData) {
        const response = await postData('/login', userData);
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return {user: parseJwt(data.token), ...data}
        }
    },
    async register(userData) {
        const response = await postData('/register', userData);
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return {user: parseJwt(data.token), ...data}
        }
    },
    async createEntry(userData) {
        const response = await postData('/entries', userData, this.headers);
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return data
        }
    },
    async getEntries() {
        const response = await postData('/entries', {}, this.headers, 'GET');
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return data
        }
    },
    async getEntry(entryId) {
        const response = await postData(`/entries/${entryId}`, {}, this.headers, 'GET');
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return data
        }
    },
    async deleteEntry(entryId) {
        const response = await postData(`/entries/${entryId}`, undefined, this.headers, 'DELETE');
        const data = await response.json();
        if(!response.ok) {
            return {
                error: await data.message
            }
        } else {
            return data
        }
    },
}

export { apiService };