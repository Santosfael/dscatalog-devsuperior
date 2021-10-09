import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from "./auth";

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://192.168.5.105:8080';

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

export function Api(params: AxiosRequestConfig) {
    return axios({
        ...params,
        baseURL: BASE_URL,
    });
};

export function PrivateRequestApi(params: AxiosRequestConfig) {
    const sessionData = getSessionData();
    const headers = {
        Authorization: `Bearer ${sessionData.access_token}`
    }

    return Api({ ...params, headers });
}

export function LoginApi(loginData: LoginData) {
    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const payload = qs.stringify({ ...loginData, grant_type: 'password' });

    return Api({ url: '/oauth/token', data: payload, method: 'POST', headers });
};