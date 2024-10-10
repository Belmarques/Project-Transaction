import { HttpCoder, HttpMapper } from '../types/httpTypes';

const httpCoder:HttpCoder = {
  CREATED: 201,
  NO_CONTENT: 204,
  SUCCESS: 200,
  INVALID: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
};

const httpMapper:HttpMapper = (status) => httpCoder[status];

export default httpMapper;