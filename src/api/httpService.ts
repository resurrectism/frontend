import fetchWithRefresh from '../utils/fetchWithRefresh';
import {
  HttpServiceError,
  UnauthorizedError,
  UnprocessableEntityError,
} from './errors';

export default class HttpService {
  protected static async get(url: string) {
    return HttpService.fetch(url, 'GET');
  }

  protected static async post<Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) {
    return HttpService.fetch(url, 'POST', data);
  }

  protected static async put<Body extends Record<string, unknown>>(
    url: string,
    data: Body,
  ) {
    return HttpService.fetch(url, 'PUT', data);
  }

  protected static async delete(url: string) {
    return HttpService.fetch(url, 'DELETE');
  }

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

  private static fetchWithRefresh = fetchWithRefresh(HttpService.refreshToken);

  private static async fetch<Body extends Record<string, unknown>>(
    url: string,
    method: string,
    data?: Body,
  ) {
    const res = await HttpService.fetchWithRefresh(
      `${HttpService.host}${url}`,
      {
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    );

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
      throw new HttpServiceError(json, status);
    }

    return json;
  }

  private static refreshToken() {
    return fetch(`${HttpService.host}/users/refresh_token`, {
      ...HttpService.commonOptions,
      method: 'POST',
    });
  }
}
