import { HttpStatusKey } from './httpTypes';

type SucessResponse<DataTypes> = {
  status: HttpStatusKey
  data: DataTypes,
  type:'success'
};

type ErrorResponse = {
  status: HttpStatusKey,
  data: { message:string },
  type: 'error'
};

export type ServiceResponse<T> = ErrorResponse | SucessResponse<T >;