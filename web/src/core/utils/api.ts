import axios, { Method } from "axios";
import qs from "qs";

import { CLIENT_ID, CLIENT_SECRET, getSessionData } from "./auth";

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
    headers?: object;
}

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = 'http://localhost:8080';

export function Api({ method = 'GET', url, data, params, headers }: RequestParams) {
    return axios({
        method,
        baseURL: `${BASE_URL}${url}`,
        data,
        params,
        headers
    });
};

export function PrivateRequestApi({ method = 'GET', url, data, params }: RequestParams) {
    const sessionData = getSessionData();
    const headers = {
        Authorization: `Bearer ${sessionData.access_token}`
    }

    return Api({ method, url, data, params, headers });
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