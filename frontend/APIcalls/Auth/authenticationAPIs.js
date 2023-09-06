import  { authApi } from '../index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async (formData) => {
  try {
    
    const response = await authApi.post(`/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.message);
  }
};
export const login = async (user) => {
      const response = await authApi.post(`/login`, user);      
      return response.data;
   
  };