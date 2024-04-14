import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const BASE_URL = 'https://api.jafurealestate.com';

export const login = async (email, password) => {
    try {
      const response = await Axios.post(`${BASE_URL}/auth/jwt/create/`, { email, password });
  
      if (response.status === 200) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem('token', response.data.access);
        return response.data;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Failed to login');
    }
};

export const resetPassword = async (email) => {
    try {
      const response = await Axios.post(`${BASE_URL}/auth/users/reset_password/`, { email });
  
      if (response.status === 204) {
        return response.data;
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      throw new Error('Failed to reset password');
    }
};

export const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
      if (!token) {
        throw new Error('No token found');
      }

      const response = await Axios.get(`${BASE_URL}/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}` // Assuming Bearer token authentication
        }
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to load user data');
      }
    } catch (error) {
      throw new Error('Failed to authenticate user');
    }
};
