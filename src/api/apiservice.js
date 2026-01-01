
import axios from 'axios';


const API = axios.create({
  baseURL: 'https://staging.fastor.ai/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fastor_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginUser = async (phone) => {
  try {
    const response = await API.post('/pwa/user/register', {
      phone,
      dial_code: '+91',
    });

    // If API returns status inside JSON (Success/Failed)
    if (response.data.status !== 'Success') {
      throw new Error(response.data.error_message || 'Failed to login');
    }

    return response.data;
  } catch (error) {
    // Axios error handling
    if (error.response && error.response.data) {
      // Use API-provided error_message if exists
      throw new Error(error.response.data.error_message || 'Server error');
    } else {
      // Network error or unexpected issue
      throw new Error(error.message || 'Something went wrong');
    }
  }
};




export const verifyOTP = async (phone, otp) => {
  try {
    const response = await API.post('/pwa/user/login', {
      phone,
      otp,
      dial_code: '+91',
    });

    // Store token in localStorage for future API calls
    localStorage.setItem('fastor_token', response.data.data.token);

    return response.data;
  } catch (error) {
    console.error('Error in verifyOTP:', error.response?.data || error.message);
    throw error;
  }
};


export const getRestaurants = async (city_id = 118) => {
  try {
    const response = await API.get(`/m/restaurant?city_id=${city_id}`);
    return response.data;
  } catch (error) {
    console.error('Error in getRestaurants:', error.response?.data || error.message);
    throw error;
  }
};

export default API;
