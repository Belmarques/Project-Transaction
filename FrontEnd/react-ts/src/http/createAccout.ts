import api from "../api";
import { Account, login } from "../types/createAccout";

export const createAccout = async (data:Account) => {
try {
  const response = await api.post('/createAccout', data);
  return response.data;
} catch (error) {
  console.error('Error to create accout', error);
  throw error;
}
}
export const authLogin = async (data:login) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    console.error('Error to login', error);
    throw error;
  }
}