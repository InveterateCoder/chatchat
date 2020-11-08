export enum Type {
  AUTH = "auth",
  CHANGE_USER = 'change_user',
}

export interface Auth {
  id: string,
  nick: string,
}

export interface ChangeUser {
  nick?: string,
  imageType?: string,
  image?: string | boolean,
}

export interface Package<T> {
  type: Type,
  payload: T,
}
