// src/config/constants.ts
export const CONNECTION_MODES = [
  { value: "Live", label: "Live Trading", description: "Real money trading" },
  { value: "Testnet", label: "Testnet", description: "Test environment with fake money" },
  { value: "Paper Trading", label: "Paper Trading", description: "Simulated trading" }
] as const; // Add 'as const' for stricter typing, allowing inference

// Optional: Define API timeouts if you want to centralize them
export const API_TIMEOUT_MS = {
  HEALTH_CHECK: 10000, // 10 seconds
  FETCH_EXCHANGES: 10000, // 10 seconds
  CONNECTION_TEST: 30000, // 30 seconds
  DEFAULT: 10000, // Default timeout for other requests
};
