export enum Type {
  AUTH = "auth"
}

export interface Auth {
  id: string,
  nick: string,
}

export interface Package<T> {
  type: Type,
  payload: T,
}
