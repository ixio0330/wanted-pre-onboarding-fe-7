import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const http = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop/',
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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