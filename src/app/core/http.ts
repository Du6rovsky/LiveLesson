import axios, {AxiosRequestConfig} from 'axios';
import {message} from "antd";

const http = axios.create({
  baseURL: 'place_holder_base_url', // Usually stored in a separate app configuration file
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request hooks
http.interceptors.request.use((cfg : AxiosRequestConfig) => {
  const token = 'some_placeholder_token';
  cfg.headers.Authorization = token;
  return cfg;
});

// Response hooks
http.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (err: any) => {
      const res = err.response;
      let response_error = '';
      if (!res) {
        message.error('Network error');
      } else {
        if (res.status === 400) {
          response_error = '400 Response error';
        }
        if (res.status === 401) {
          response_error = '401 Response error';
        }
        if (res.status === 403) {
          response_error = '403 Response error';
        }
        if (res.status === 404) {
          response_error = '404 Response error';
        }
        if (res.status === 500) {
          response_error = '500 server error';
        }
        if (res.status === 502) {
          response_error = '502 server is not available';
        }
        message.error(response_error);
      }
      return Promise.reject(err);
    },
);


export default http;
