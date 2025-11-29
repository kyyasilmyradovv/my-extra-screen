/**
 * API configuration utility
 * Access the API URL from environment variables
 */
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/';

/**
 * Get the full API endpoint URL
 * @param {string} endpoint - The API endpoint (e.g., '/api/contact')
 * @returns {string} Full URL
 */
export const getApiUrl = (endpoint) => {
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};
