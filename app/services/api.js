import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY, BASE_URL } from './Constants';

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

// Customer actions
const fetchCustomerByName = async (phone, token) => {
    try {
        const response = await Axios.get(`${BASE_URL}/api/customerbyname/${phone}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Failed to fetch data:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Network error in fetching customer by name:", error);
        return null;
    }
};

export const searchCustomer = async (phone, token) => {
    try {
      if (!token) {
        console.log("No access token available.");
        return null; // Early exit if no token is found
      }
      const response = await fetchCustomerByName(phone, token);
      if (response) {
        return response; // Successfully fetched customer data
      } else {
        console.log("API Error: No customer data returned or bad request.");
        return null; // Early exit if response is falsy indicating API call failure or null response
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      return null; // Early exit on exception
    }
};
  
export const fetchCustomerOnly = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/customeronly/`, {
            headers: { Authorization: `Bearer ${token}` } // Use token for Authorization
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch customer data: Status code ${response.status}`); // Throw an error with the response status
        }
    } catch (error) {
        console.error("Error fetching customer data:", error); // Log the error for debugging
        throw new Error("Failed to fetch customer data due to network or server error."); // Throw a generic error message for the catch block
    }
};

export const fetchAllCustomer = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all customer data
        const response = await Axios.get(`${BASE_URL}/api/customer/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch customer data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching customer data:", error); // Log the error for debugging
        throw new Error("Failed to fetch customer data due to network or server error."); // Provide user-friendly error message
    }
};

// Orders action

export const fetchAllOrders = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all orders data
        const response = await Axios.get(`${BASE_URL}/api/orders/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch orders data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching orders data:", error); // Log the error for debugging
        throw new Error("Failed to fetch orders data due to network or server error."); // Provide user-friendly error message
    }
};