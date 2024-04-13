import Axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export const login = async (email, password) => {
  try {
    const response = await Axios.post(`${BASE_URL}/api/gettoken/`, { email, password });

    if (response.status !== 200) {
      throw new Error('Login failed');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
