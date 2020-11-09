export enum Type {
  AUTH = "auth",
  CHANGE_USER = 'change_user',
}

export type Auth = {
  id: string,
  nick: string,
  url: string,
}

export type ChangeUser = {
  nick?: string,
  imageType?: string,
  image?: string,
  url?: string
}

export type Package<T> = {
  type: Type,
  payload: T,
}
