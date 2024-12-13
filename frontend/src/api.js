import axios from "axios";

const BASE_AUTH_URL = 'http://127.0.0.1:8000/';
const LOGIN_URL = `${BASE_AUTH_URL}token/`;
const REGISTER_URL = `${BASE_AUTH_URL}register/`;
const NOTES_URL = `${BASE_AUTH_URL}notes/`;
const REFRESH_URL = `${BASE_AUTH_URL}token/refresh/`;
const LOGOUT_URL = `${BASE_AUTH_URL}logout/`;
const AUTHENTICATED_URL = `${BASE_AUTH_URL}authenticated/`;
const SEARCH_URL = `${NOTES_URL}search/?search=`;


export async function login(username, password) {
    const response = await axios.post(
        LOGIN_URL,
        { "username": username, "password": password },
        { withCredentials: true }
    );

    return response.data.success;
}

export async function getNotes() {
    const func = () => axios.get(NOTES_URL, { withCredentials: true });
    try {
        const response = await func();

        return response.data;
    } catch (error) {
        const refreshed_response = await callRefresh(error, func);

        if (refreshed_response){
            return refreshed_response
        }
        return []
    }

}


export async function refreshToken() {
    try {
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.data.refreshed;
    } catch (error) {
        return false;
    }

}

// Refreshes access token
async function callRefresh(error, func) {
    if (error.response && error.response === 401) {
        const isTokenRefreshed = await refreshToken()

        if (isTokenRefreshed) {
            const retryResponse = await func();

            return retryResponse.data;
        }

    }

    return false;
}

export async function logout() {
    try {
        const response = await axios.post(LOGOUT_URL, {}, { withCredentials: true });
        return response.data.success;
    } catch (error) {
        return false;
    }

}

export async function isUserAuthenticated() {
    try {
        const response = await axios.get(AUTHENTICATED_URL, { withCredentials: true });
        console.log('authenticated', response.data.authenticated)
        return response.data.authenticated;
    } catch (error) {
        return false;
    }
}

export async function register(username, email, password) {
    const response = await axios.post(
        REGISTER_URL,
        { "username": username, "email": email, "password": password },
        { withCredentials: true }
    );
    return response.data;
}

export async function addNewNote(data) {
    try{
        await axios.post(NOTES_URL, data, {withCredentials: true});
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export async function updateNote(data) {
    try {
        await axios.put(`${NOTES_URL}${data.id}/`, data, {withCredentials: true});
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export async function deleteNote(id) {
    try {
        await axios.delete(`${NOTES_URL}${id}/`, {withCredentials: true});
        return true
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export async function getNote(id) {
    try {
        const response = await axios.get(`${NOTES_URL}${id}/`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error.message);
        return {};
    }
}

export async function searchNote(searchedText) {
    try {
        const response = await axios.get(`${SEARCH_URL}${searchedText}`, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}