export type UserLogin = {
  data: {
    type: 'user';
    attributes: {
      email: string;
      password: string;
    };
  };
};

export type UserSignUp = {
  data: {
    type: 'user';
    attributes: {
      email: string;
      password: string;
      password_confirmation: string;
    };
  };
};
