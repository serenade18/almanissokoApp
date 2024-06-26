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
        console.log('response', response)
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

// Dashboard actions

export const fetchDashboard = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all data
        const response = await Axios.get(`${BASE_URL}/api/dashboard/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Log the error for debugging
        throw new Error("Failed to fetch data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchDiscount = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all discount data
        const response = await Axios.get(`${BASE_URL}/api/total-discount/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch discount data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching discount data:", error); // Log the error for debugging
        throw new Error("Failed to fetch discount data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchTotalPayments = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all payments data
        const response = await Axios.get(`${BASE_URL}/api/total-payment/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch payments data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching payments data:", error); // Log the error for debugging
        throw new Error("Failed to fetch payments data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchTotalKilos = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all kilos data
        const response = await Axios.get(`${BASE_URL}/api/total-kgs/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch kilos data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching kilos data:", error); // Log the error for debugging
        throw new Error("Failed to fetch kilos data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchDebtors = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all debtors data
        const response = await Axios.get(`${BASE_URL}/api/customers/total-balance/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch debtors data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching debtors data:", error); // Log the error for debugging
        throw new Error("Failed to fetch debtors data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchMonthlyData = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all monthly data
        const response = await Axios.get(`${BASE_URL}/api/monthly_chart/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch monthly data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching monthly data:", error); // Log the error for debugging
        throw new Error("Failed to fetch monthly data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchCustomerRegion = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all customers data
        const response = await Axios.get(`${BASE_URL}/api/customers_region/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch customers data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching customers data:", error); // Log the error for debugging
        throw new Error("Failed to fetch customers data due to network or server error."); // Provide user-friendly error message
    }
};

export const fetchHomePage = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all data
        const response = await Axios.get(`${BASE_URL}/api/home_api/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching data:", error); // Log the error for debugging
        throw new Error("Failed to fetch data due to network or server error."); // Provide user-friendly error message
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

// Farmers Action

export const fetchAllFarmers = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all farmers data
        const response = await Axios.get(`${BASE_URL}/api/farmer/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch farmers data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching farmers data:", error); // Log the error for debugging
        throw new Error("Failed to fetch farmers data due to network or server error."); // Provide user-friendly error message
    }
};

export const deleteFarmers = async (id) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available")
        throw new Error("Authentication is not available")
    }

    try {
        const response = await Axios.delete(`${BASE_URL}/api/farmer`)
    } catch (error) {
        console.error("Error deleting farmers data", error)
        throw new Error("Failed to delete farmers data due to netwokrk or server error")
    }
}

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

// Paymentss Action

export const fetchAllPayments = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all Payments data
        const response = await Axios.get(`${BASE_URL}/api/payments/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch Payments data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching Payments data:", error); // Log the error for debugging
        throw new Error("Failed to fetch Payments data due to network or server error."); // Provide user-friendly error message
    }
};

// Ivoice Action

export const fetchAllInvoice = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        // Make an HTTP GET request to fetch all Payments data
        const response = await Axios.get(`${BASE_URL}/api/invoice/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
        });

        if (response.status === 200) {
            return response.data; // Return the fetched data directly if the request is successful
        } else {
            throw new Error(`Failed to fetch Invoice data: Status code ${response.status}`); // Provide detailed error info
        }
    } catch (error) {
        console.error("Error fetching Invoice data:", error); // Log the error for debugging
        throw new Error("Failed to fetch Invoice data due to network or server error."); // Provide user-friendly error message
    }
};