import {
  ApiError,
  UnauthorizedError,
  UnprocessableEntityError,
} from './errors';
import { UserLogin, UserSignUp } from './types';

export class Api {
  static get host(): string {
    return import.meta.env.PROD
      ? (import.meta.env.VITE_API_URL as string)
      : 'http://api.resurrectism.test:3000';
  }

  static async fetch<Body extends Record<string, unknown>>(
    url: string,
    method: string,
    data?: Body,
  ) {
    const res = await fetch(`${Api.host}${url}`, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    let json;
    try {
      json = await res.json();
    } catch (e) {
      json = {};
    }

    const { status } = res;
    if (status === 422) {
      throw new UnprocessableEntityError(json.errors);
    } else if (status === 401) {
      throw new UnauthorizedError();
    } else if (!res.ok) {
      throw new ApiError(json, status);
    }

    return json;
  }

  static get = async (url: string) => Api.fetch(url, 'GET');

  static post = async <Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) => Api.fetch(url, 'POST', data);

  static put = async <Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) => Api.fetch(url, 'PUT', data);

  static delete = async (url: string) => Api.fetch(url, 'DELETE');

  // Users API
  static usersLogin = async (body: UserLogin) => Api.post('/users/login', body);

  static usersCreate = async (body: UserSignUp) => Api.post('/users', body);

  static usersLogout = async () => Api.post('/users/logout', {});

  static usersRefreshToken = async () => {
    const body = { refreshToken: localStorage.getItem('refreshToken') };
    return Api.post('/users/refresh_token', body);
  };

  // Profile API
  static profile = async () => Api.get('/profile');
}
