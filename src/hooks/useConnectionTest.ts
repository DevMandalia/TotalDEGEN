// src/hooks/useConnectionTest.ts
import { useState, useCallback } from 'react';
import { fetchWrapper } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { API_TIMEOUT_MS } from '@/config/constants'; // Import API_TIMEOUT_MS

export type ConnectionStatus = 'idle' | 'connecting' | 'success' | 'error';

interface ConnectionTestParams {
  exchange: string;
  mode: string; // "Live", "Testnet", "Paper Trading"
  apiKey?: string;
  secretKey?: string;
}

export const useConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const testConnection = useCallback(async (params: ConnectionTestParams): Promise<boolean> => {
    const { exchange, mode, apiKey, secretKey } = params;

    if (!exchange || (mode !== "Paper Trading" && (!apiKey || !secretKey))) {
      setErrorMessage("Please fill in all required fields for connection testing.");
      setConnectionStatus('error'); 
      return false;
    }

    setIsLoading(true);
    setConnectionStatus('connecting');
    setErrorMessage(null);
    console.log('useConnectionTest: Starting connection test...');
    console.log('useConnectionTest: Params:', { ...params, apiKey: params.apiKey ? '[HIDDEN]' : undefined, secretKey: params.secretKey ? '[HIDDEN]' : undefined });


    try {
      if (mode === "Paper Trading") {
        console.log('useConnectionTest: Paper trading mode - simulating connection.');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
        setConnectionStatus('success');
        console.log('useConnectionTest: Paper trading connection successful.');
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${exchange} in Paper Trading mode`,
        });
        return true;
      } else {
        // For live/testnet, test actual connection using the backend API
        console.log(`useConnectionTest: Testing ${mode} connection via backend API for ${exchange}.`);
        
        const requestBody = {
          exchange: exchange.toLowerCase(), 
          mode: mode.toLowerCase(),
          apiKey: apiKey,
          secretKey: secretKey
        };
        
        console.log('useConnectionTest: Connection request body:', { ...requestBody, apiKey: '[HIDDEN]', secretKey: '[HIDDEN]' });

        // Using fetchWrapper from api.ts
        // The endpoint is /api/exchange/connect
        const connectionData = await fetchWrapper('/api/exchange/connect', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          timeout: API_TIMEOUT_MS.CONNECTION_TEST, // Use constant for timeout
        });

        console.log('useConnectionTest: Connection test successful via API:', connectionData);
        setConnectionStatus('success');
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${exchange} in ${mode} mode`,
        });
        return true;
      }
    } catch (error) {
      console.error('useConnectionTest: Connection error:', error);
      setConnectionStatus('error');
      let errorMsg = 'Connection failed due to an unexpected error.';
      if (error instanceof Error) {
        errorMsg = error.message; 
      }
      setErrorMessage(errorMsg);
      toast({
        title: "Connection Failed",
        description: errorMsg,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
      console.log('useConnectionTest: Connection test finished.');
    }
  }, [toast]);

  const resetConnectionStatus = useCallback(() => {
    setConnectionStatus('idle');
    setErrorMessage(null);
    setIsLoading(false);
  }, []);

  return {
    connectionStatus,
    isConnecting: isLoading, 
    connectionError: errorMessage,
    testConnection,
    resetConnectionStatus,
  };
};
