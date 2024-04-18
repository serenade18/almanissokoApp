import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY } from './Constants';

const BASE_URL = 'https://api.jafurealestate.com';

// Authentication actions
export const login = async (email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/jwt/create/`, { email, password });
        if (response.status === 200) {
            // Save token to AsyncStorage
            await AsyncStorage.setItem(TOKEN_KEY, response.data.access);
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
            return 'Reset password instructions sent.';
        } else {
            throw new Error('Failed to reset password');
        }
    } catch (error) {
        throw new Error('Failed to reset password');
    }
};

export const loadUser = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (!token) {
            throw new Error('No token found');
        }
        const response = await Axios.get(`${BASE_URL}/auth/users/me/`, {
            headers: { Authorization: `Bearer ${token}` }
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

// Place order actions
const fetchCustomerByName = async (phone, token) => {
    try {
        const response = await Axios.get(`${BASE_URL}/api/customerbyname/${phone}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Failed to fetch data: ", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Network error in fetching customer by name:", error);
        return null;
    }
};

export const searchCustomer = async (phone) => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("Retrieved token: ", token);
        
        if (!token) {
            console.log("No access token available.");
            return null; // Early exit if no token is found
        }

        const response = await fetchCustomerByName(phone, token);
        if (!response) {
            console.log("API Error: No customer data returned or bad request.");
            return null; // Early exit if response is falsy indicating API call failure or null response
        }

        console.log("Customer Data:", response);
        return response; // Successfully fetched customer data
    } catch (error) {
        console.error("Error fetching customer data:", error);
        return null; // Early exit on exception
    }
};
