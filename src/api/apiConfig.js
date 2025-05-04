import axios from "axios";
import {store} from "../main.jsx";

export const setUpAxiosInterceptors = (token) => {
    axios.interceptors.request.use(
        (config) => {
            let isTrue = store.getState().login.loginSuccess;

            if (isTrue) {
                const token = store.getState().login.token;
                config.headers.Authorization = "Bearer " + token;
            }
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
};

export const setUpAxiosInterceptorsResponse = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (error.response.status === 401) {
            }
            return error.response;
        }
    );
};
