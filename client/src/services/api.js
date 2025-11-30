import axios from 'axios';

/**
 * API Service
 * Handles all backend API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//API to save the content

export const saveVersion = async (content) => {
  try {
    const response = await apiClient.post('/save-version', { content });
    return response.data;
  } catch (error) {
    console.error('Error saving version:', error);
    throw error.response?.data || { message: 'Failed to save version' };
  }
};

//Api to get all versions
export const getVersions = async () => {
  try {
    const response = await apiClient.get('/versions');
    return response.data;
  } catch (error) {
    console.error('Error fetching versions:', error);
    throw error.response?.data || { message: 'Failed to fetch versions' };
  }
};

export default apiClient;

