import axios from 'axios';

/**
 * API Service
 * Handles all backend API calls
 */

// Ensure base URL doesn't have trailing slash
const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL || 'https://audit-trail-generator-server.onrender.com/api';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const API_BASE_URL = getBaseURL();

console.log('API Base URL:', API_BASE_URL);

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
    const fullUrl = `${API_BASE_URL}/versions`;
    console.log('Fetching versions from:', fullUrl);
    const response = await apiClient.get('/versions');
    return response.data;
  } catch (error) {
    console.error('Error fetching versions:', error);
    console.error('Request URL:', error.config?.url);
    console.error('Full URL:', error.config?.baseURL + error.config?.url);
    throw error.response?.data || { message: 'Failed to fetch versions' };
  }
};

//Api to delete a version
export const deleteVersion = async (id) => {
  try {
    const response = await apiClient.delete(`/versions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting version:', error);
    throw error.response?.data || { message: 'Failed to delete version' };
  }
};

export default apiClient;

