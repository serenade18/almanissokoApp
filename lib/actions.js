import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { TOKEN_KEY, BASE_URL } from './constants';

// Global search function

export const globalSearch = async (query) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/search/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            },
            params: { query } // Pass the query parameter
        });

        if (response.status === 200) {
            const { categories, customer } = response.data.data;
            return {
                categories: categories || [],
                services: services || []
            };
        } else {
            throw new Error(`Search failed: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error performing global search:", error);
        throw new Error("Failed to perform search due to network or server error.");
    }
};

//  Dashboard Function

export const fetchHomePage = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/home_api/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error(`Failed to fetch homepage data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching homepage data:", error); 
        throw new Error("Failed to fetch homepage data due to network or server error."); 
    }
};

export const fetchBalance= async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/total-balance/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error(`Failed to fetch homepage data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching homepage data:", error); 
        throw new Error("Failed to fetch homepage data due to network or server error."); 
    }
};

// Authentication actions

export const login = async (email, password) => {
    try {
        const response = await Axios.post(`${BASE_URL}/auth/jwt/create/`, { email, password });
        if (response.status === 200) {
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

// Orders action

export const fetchOrderById = async (id) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/ordername/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            }
        });

    //    console.log("response", response.data)

        if (response.status === 200) {
            return response.data.results;
        } else {
            throw new Error(`Search failed: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error performing global search:", error);
        throw new Error("Failed to perform search due to network or server error.");
    }
};

export const fetchCustomerByName = async (phone) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); // Retrieve the token

    if (!token) {
        console.error("No access token available."); // Log and handle cases where no token is found
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/customerbyname/${phone}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
            }
        });

        // console.log("response", response.data.results)

        if (response.status === 200) {
            return response.data.results;
        } else {
            throw new Error(`Search failed: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error performing global search:", error);
        throw new Error("Failed to perform search due to network or server error.");
    }
};

export const bookNow = async (name, phone, customer_id, town, region, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/orders/`,
            { name, phone, customer_id, town, region, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 201) { 
            return response.data;
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

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

export const fetchOrderDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/orders/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch orders details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching orders details:", error);
        throw new Error("Failed to fetch orders details due to network or server error.");
    }
};

// Customer Action

export const saveCustomer = async (name, phone, secondary_phone, alternative_phone, town, region) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/customer/`,
            { name, phone, secondary_phone, alternative_phone, town, region },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 200) { 
            return response.data;
        } else {
            throw new Error('Creation failed');
        }
    } catch (error) {
        console.error('Creation error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

export const fetchAllCustomer = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/customer/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error(`Failed to fetch customer data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching customer data:", error); 
        throw new Error("Failed to fetch customer data due to network or server error."); 
    }
};

export const fetchCustomerDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/customer/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch customer details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching customer details:", error);
        throw new Error("Failed to fetch customer details due to network or server error.");
    }
};

export const editCustomer = async (name, phone, secondary_phone, alternative_phone, town, region, id) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/customer/${id}/`,
            { name, phone, secondary_phone, alternative_phone, town, region },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 200) { 
            return response.data;
        } else {
            throw new Error('Creation failed');
        }
    } catch (error) {
        console.error('Creation error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

// Farmer Action

export const fetchFarmerOnly= async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/farmeronly/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data.results; 
        } else {
            throw new Error(`Failed to fetch farmer data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching farmer data:", error); 
        throw new Error("Failed to fetch farmer data due to network or server error."); 
    }
};

export const saveFarmer = async (name, phone) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/farmer/`,
            { name, phone },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 200) { 
            return response.data;
        } else {
            throw new Error('Creation failed');
        }
    } catch (error) {
        console.error('Creation error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

export const fetchAllFarmer = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/farmer/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error(`Failed to fetch farmer data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching farmer data:", error); 
        throw new Error("Failed to fetch farmer data due to network or server error."); 
    }
};

export const fetchFarmerDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/farmer/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch farmer details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching farmer details:", error);
        throw new Error("Failed to fetch farmer details due to network or server error.");
    }
};

export const editFarmer = async (name, phone, id) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/farmer/${id}/`,
            { name, phone },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        if (response.status === 200) { 
            return response.data;
        } else {
            throw new Error('Creation failed');
        }
    } catch (error) {
        console.error('Creation error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

// Payments Action

export const savePayment = async (orders_id, paying_number, amount, payment_mode, payment, customer_id) => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.post(
            `${BASE_URL}/api/payments/`,
            { orders_id, paying_number, amount, payment_mode, payment, customer_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            }
        );

        console.log("PAyment", response.data)

        if (response.status === 201) { 
            return response.data;
        } else {
            throw new Error('Booking failed');
        }
    } catch (error) {
        console.error('Booking error:', error.response?.data || error.message);
        throw new Error('Failed to book the service');
    }
};

export const fetchAllPayment = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY); 

    if (!token) {
        console.error("No access token available."); 
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/payments/`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error(`Failed to fetch payments data: Status code ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching payments data:", error); 
        throw new Error("Failed to fetch payments data due to network or server error."); 
    }
};

export const fetchPaymentDetails = (id) => async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);

    if (!token) {
        console.error("No access token available.");
        throw new Error("Authentication token is not available.");
    }

    try {
        const response = await Axios.get(`${BASE_URL}/api/payments/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return response.data;  // Adjust this according to your actual API response structure
        } else {
            throw new Error(`Failed to fetch orders details: Status code ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching orders details:", error);
        throw new Error("Failed to fetch orders details due to network or server error.");
    }
};
