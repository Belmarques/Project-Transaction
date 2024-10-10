export type HttpStatusKey = 'CREATED' | 'NO_CONTENT' |
'SUCCESS' | 'INVALID' | 'NOT_FOUND' | 'CONFLICT' | 'UNAUTHORIZED';

export type HttpCoder = {
  [key in HttpStatusKey]:number
};
export type HttpMapper = (status:HttpStatusKey) => number;
