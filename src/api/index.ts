import { UserLogin, UserSignUp } from './types';
import HttpService from './httpService';

export class Api extends HttpService {
  // Users API
  static usersLogin = async (body: UserLogin) => Api.post('/users/login', body);

  static usersCreate = async (body: UserSignUp) => Api.post('/users', body);

  static usersLogout = async () => Api.post('/users/logout', {});

  // Profile API
  static profile = async () => Api.get('/profile');
}
