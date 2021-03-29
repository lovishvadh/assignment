import axios from "axios";

import {
    Timeout,
    Unauthorized,
    InternalServerError,
    SomeError,
  } from '../Utils/MockApiFailure';
import browserHistory from "../history";

const BaseAxios = axios.create({
    baseURL: 'http://3.16.23.133/',
    headers: {
      'Content-Type': 'application/json',
      version:1,
    },
});

async function handleApiError(error) {
    if (!error) {
      return InternalServerError;
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('jwt');
          localStorage.removeItem('twitchAccessToken');
          browserHistory.push('/sign-in');
          return Unauthorized;
        case 408:
          return Timeout;
      }
      if (error.response.status >= 500) {
        return InternalServerError;
      }
    } else if (error.code) {
      return InternalServerError;
    } 
    return SomeError;
}

function addAuthTokenToRequest(headers) {
    const token = localStorage.getItem("jwt");
    if (token) {
      console.log("token present")
      return Object.assign({}, headers || {}, {
        Authorization: `Bearer ${token}`,
      });
    }
    return headers || {};
}
  
export function get(path, params = {}, headers = {}) {
    return BaseAxios.get(path, {
        params,
        headers: addAuthTokenToRequest(headers),
    }).catch(handleApiError);
}

export function post(path, data = {}, params = {}, headers = {}) {
    return BaseAxios.post(path, data, {
      params,
      headers: addAuthTokenToRequest(headers),
    }).catch(handleApiError);
}
