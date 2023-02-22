import axios from 'axios';
import { API_URL } from '../constants';

const http = axios.create({ baseURL: `${API_URL}/` });

const request = (
  method: string,
  url: string,
  options: any,
) => {
  return http
    .request({
      ...options,
      method,
      url,
      withCredentials: true,
    })
    .catch(httpErrorHandler)
};

const httpErrorHandler = async (err: any) => {
  const response = err?.response;
  const data = response?.data;

  throw {
    ...data,
    message: data?.message || 'Network Error!'
  };
};

const Http = {
  get(url: string, params = {}, headers = {}) {
    return request('GET', url, { params, headers });
  },
  post(url: string, body = {}, headers = {}) {
    return request('POST', url, { data: body, headers });
  },
  put(url: string, body = {}, headers = {}) {
    return request('PUT', url, { data: body, headers });
  },
  patch(url: string, body = {}, headers = {}) {
    return request('PATCH', url, { data: body, headers });
  },
  delete(url: string, body = {}, headers = {}) {
    return request('DELETE', url, { data: body, headers });
  }
};

export default Http;
