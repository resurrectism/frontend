export type Resource<Attributes, Type> = {
  data: { type: Type; attributes: Attributes };
};

export type UserLoginAttributes = {
  email: string;
  password: string;
};
export type UserLogin = Resource<UserLoginAttributes, 'user'>;

export type UserSignUpAttributes = {
  email: string;
  password: string;
  password_confirmation: string;
};
export type UserSignUp = Resource<UserSignUpAttributes, 'user'>;

export type ProfileAttributes = {
  email: string;
};

export type Profile = Resource<ProfileAttributes, 'profile'>;
