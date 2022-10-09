import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { getToken } from "../utils/localStorage";

const http = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop',
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken();
      }
    }
    return config;
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default http;