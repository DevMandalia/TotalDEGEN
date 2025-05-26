// API client for backend communication
import axios from 'axios';

// Get the API base URL from environment variables or use the exposed port URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://3000-iatheihmda24k2ayd5cg4-ed94c467.manus.computer";
// Remove trailing /api if present to avoid double /api/api paths
const cleanBaseUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL.slice(0, -4) : API_BASE_URL;

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: cleanBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// API functions
export const api = {
  // Health check
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      // Try direct fetch as fallback
      try {
        const directResponse = await fetch(`${API_BASE_URL}/api/health`);
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
      const response = await apiClient.get('/api/exchanges');
      return response.data.exchanges;
    } catch (error) {
      console.error('Failed to fetch exchanges:', error);
      throw error;
    }
  },

  // Connect to exchange
  connectExchange: async (exchange: string, apiKey: string, secretKey: string) => {
    try {
      const response = await apiClient.post('/api/exchange/connect', {
        exchange,
        apiKey,
        secretKey
      });
      return response.data;
    } catch (error) {
      console.error('Failed to connect to exchange:', error);
      throw error;
    }
  },

  // Get account balances
  getBalances: async () => {
    try {
      const response = await apiClient.get('/api/exchange/balances');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch balances:', error);
      throw error;
    }
  }
};

export default api;
