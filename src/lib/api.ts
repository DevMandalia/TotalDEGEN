
// API client for backend communication
import axios from 'axios';

// Get the API base URL from environment variables or use the exposed port URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://3000-iboiaeuvpxrytnh0hxg0q-ed94c467.manus.computer/api";
// Remove trailing /api if present to avoid double /api/api paths
const cleanBaseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;

console.log('API Base URL configured:', cleanBaseUrl);

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: cleanBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 30000, // 30 second timeout
});

// Add request interceptor for logging
apiClient.interceptors.request.use((config) => {
  console.log(`Making API request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API response received: ${response.status} ${response.statusText}`);
    return response;
  },
  (error) => {
    console.error(`API request failed:`, error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const api = {
  // Health check
  checkHealth: async () => {
    try {
      console.log('=== HEALTH CHECK START ===');
      const response = await apiClient.get('/api/health');
      console.log('Health check successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      // Try direct fetch as fallback
      try {
        const directUrl = `${cleanBaseUrl}/api/health`;
        console.log('Trying direct fetch to:', directUrl);
        const directResponse = await fetch(directUrl);
        const data = await directResponse.json();
        console.log('Direct health check succeeded:', data);
        return data;
      } catch (directError) {
        console.error('Direct health check also failed:', directError);
        throw error;
      }
    }
  },

  // Get supported exchanges
  getSupportedExchanges: async () => {
    try {
      console.log('=== FETCHING EXCHANGES START ===');
      const response = await apiClient.get('/api/exchanges');
      console.log('Exchanges fetched successfully:', response.data);
      return response.data.exchanges;
    } catch (error) {
      console.error('Failed to fetch exchanges:', error);
      throw error;
    }
  },

  // Connect to exchange
  connectExchange: async (exchange: string, apiKey: string, secretKey: string, isTestnet: boolean = false) => {
    try {
      console.log('=== EXCHANGE CONNECTION START ===');
      console.log('Exchange:', exchange);
      console.log('Is Testnet:', isTestnet);
      const response = await apiClient.post('/api/exchange/connect', {
        exchange,
        apiKey,
        secretKey,
        testnet: isTestnet
      });
      console.log('Exchange connection successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to connect to exchange:', error);
      throw error;
    }
  },

  // Get account balances
  getBalances: async () => {
    try {
      console.log('=== FETCHING BALANCES START ===');
      const response = await apiClient.get('/api/exchange/balances');
      console.log('Balances fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch balances:', error);
      throw error;
    }
  }
};

export default api;
