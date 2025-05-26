// src/services/api.ts

// Ideally, this would come from an environment variable (e.g., process.env.REACT_APP_API_BASE_URL)
// For this exercise, we'll define it as a constant here.
export const API_BASE_URL = "https://3000-i55ier1dg4ii27z5jww1z-a32dc834.manus.computer";

interface FetchWrapperOptions extends RequestInit {
  timeout?: number;
}

// Import API_TIMEOUT_MS
import { API_TIMEOUT_MS } from "@/config/constants";

/**
 * A generic fetch wrapper function that includes timeout support,
 * common headers, and basic error handling.
 *
 * @param endpoint The API endpoint to call (e.g., "/health").
 * @param options Fetch options (method, body, headers, timeout, etc.).
 * @returns Promise<any> The JSON response from the API.
 * @throws Error if the request fails, times out, or the response is not ok.
 */
export const fetchWrapper = async (endpoint: string, options: FetchWrapperOptions = {}): Promise<any> => {
  // Use API_TIMEOUT_MS.DEFAULT for the default timeout
  const { timeout = API_TIMEOUT_MS.DEFAULT, ...fetchOptions } = options; 

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.warn(`Request to ${endpoint} timed out after ${timeout / 1000}s`);
    controller.abort();
  }, timeout);

  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`Fetching from URL: ${url}`, fetchOptions);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log(`Response from ${endpoint}: Status ${response.status}`);
    console.log(`Response headers from ${endpoint}:`, response.headers);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error(`API error response from ${endpoint}:`, errorData);
      } catch (e) {
        console.error(`Could not parse error JSON from ${endpoint}:`, e);
        errorData = { message: `Request failed with status ${response.status} ${response.statusText}` };
      }
      throw new Error(errorData?.message || errorData?.error || `Request failed with status ${response.status}`);
    }

    // Handle cases where response might be empty (e.g., 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();
      console.log(`JSON Data from ${endpoint}:`, jsonData);
      return jsonData;
    } else {
      console.log(`Response from ${endpoint} is not JSON, returning null or text.`);
      // For non-JSON responses, you might want to return response.text() or null
      // For now, returning null if not JSON, adjust as needed.
      return null; 
    }

  } catch (error) {
    clearTimeout(timeoutId); // Ensure timeout is cleared on any error
    if (error instanceof Error) {
      console.error(`Error fetching ${endpoint}: ${error.message}`, error);
      if (error.name === 'AbortError') {
        throw new Error(`Request to ${endpoint} timed out after ${timeout / 1000}s`);
      }
      throw error; // Re-throw the original error or a modified one
    } else {
      console.error(`Unknown error fetching ${endpoint}:`, error);
      throw new Error('An unknown error occurred during the API request.');
    }
  }
};

// Example usage (optional, for testing purposes):
/*
async function testFetch() {
  try {
    console.log('Testing /health endpoint...');
    const healthData = await fetchWrapper("/health", { method: 'GET' });
    console.log('Health data:', healthData);

    // console.log('Testing /api/exchanges endpoint...');
    // const exchangesData = await fetchWrapper("/api/exchanges", { method: 'GET' });
    // console.log('Exchanges data:', exchangesData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Test fetch failed:', error.message);
    } else {
      console.error('Test fetch failed with unknown error:', error);
    }
  }
}
// testFetch();
*/

export interface ApiHealth {
  status: 'ok' | 'error';
  [key: string]: any; 
}

export interface ApiExchange {
  id: string;
  name: string;
  enabled: boolean;
  [key: string]: any; // Allow other properties from backend
}

export interface MappedExchange {
  id: string;
  name: string;
  enabled: boolean;
}
