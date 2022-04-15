import {
  ApiError,
  UnauthorizedError,
  UnprocessableEntityError,
} from './errors';
import { UserLogin, UserSignUp } from './types';
import fetchWithRefresh from '../utils/fetchWithRefresh';

export class Api {
  // Users API
  static usersLogin = async (body: UserLogin) => Api.post('/users/login', body);

  static usersCreate = async (body: UserSignUp) => Api.post('/users', body);

  static usersLogout = async () => Api.post('/users/logout', {});

  // Profile API
  static profile = async () => Api.get('/profile');

  // Private
  private static get host(): string {
    return import.meta.env.PROD
      ? (import.meta.env.VITE_API_URL as string)
      : 'http://api.resurrectism.test:3000';
  }

  private static commonOptions: RequestInit = Object.freeze({
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    credentials: 'include',
  });
  private static fetchWithRefresh = fetchWithRefresh(Api.refreshToken);

  private static async fetch<Body extends Record<string, unknown>>(
    url: string,
    method: string,
    data?: Body,
  ) {
    const res = await Api.fetchWithRefresh(`${Api.host}${url}`, {
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

  private static async get(url: string) {
    return Api.fetch(url, 'GET');
  }

  private static async post<Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) {
    return Api.fetch(url, 'POST', data);
  }

  private static async put<Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) {
    return Api.fetch(url, 'PUT', data);
  }

  private static async delete(url: string) {
    return Api.fetch(url, 'DELETE');
  }

  private static refreshToken() {
    return fetch(`${Api.host}/users/refresh_token`, {
      ...Api.commonOptions,
      method: 'POST',
    });
  }
}
