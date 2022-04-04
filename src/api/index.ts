import { UserLogin, UserSignUp } from './types';

type ModelValidationError = {
  source: {
    pointer: string;
  };
  detail: string;
};

export class UnprocessableEntityError extends Error {
  public errors: ModelValidationError[];

  constructor({ errors }: { errors: ModelValidationError[] }) {
    super(`Unprocessable Entity: ${errors.map((e) => e.detail).join(', ')}`);
    this.errors = errors;
  }

  public get errorsMap(): Record<string, string[]> {
    return this.errors.reduce((acc, e) => {
      const {
        source: { pointer },
        detail,
      } = e;
      const key = pointer.replace('/data/attributes/', '');

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(detail);

      return acc;
    }, {} as Record<string, string[]>);
  }
}

export class Api {
  static get host(): string {
    return import.meta.env.PROD
      ? (import.meta.env.VITE_API_URL as string)
      : 'http://localhost:3000';
  }

  static async fetch<Body extends Record<string, unknown>>(
    url: string,
    method: string,
    data?: Body,
  ) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(`${Api.host}${url}`, options);

    let json;
    try {
      json = await res.json();
    } catch (e) {
      json = {};
    }

    if (res.status === 422) {
      throw new UnprocessableEntityError(json);
    } else if (!res.ok) {
      throw new Error(json);
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
