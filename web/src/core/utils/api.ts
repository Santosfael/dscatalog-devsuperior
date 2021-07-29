import axios, { Method } from "axios";

type RequestParams = {
    method?: Method;
    url: string;
    data?: object;
    params?: object;
}

const BASE_URL = 'http://localhost:3000';

function Api({ method = 'GET', url, data, params }: RequestParams) {
    return axios({
        method,
        baseURL: `${BASE_URL}${url}`,
        data,
        params
    });
}

export default Api;