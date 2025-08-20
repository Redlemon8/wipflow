export interface IProject {
  id: number;
  name: string;
}

export interface IList {
  id: number;
  title: string;
  position: number;
  cards: ICard[];
  project_id: number;
}

export interface ICard {
  id: number;
  content: string;
  position: number;
  color: string;
  tags: ITag[];
}

export interface ITag {
  id: number;
  name: string;
  color: string;
}

export interface IUser {
  id: number;
  email: string;
  name?: string;
  created_at: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface IAuthResponse {
  message: string;
  user: IUser;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IRefreshTokenRequest {
  refresh_token: string;
}
