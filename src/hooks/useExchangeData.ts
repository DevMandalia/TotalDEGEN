// src/hooks/useExchangeData.ts
import { useState, useCallback } from 'react';
import { fetchWrapper, ApiHealth, ApiExchange, MappedExchange } from '@/services/api'; // Removed API_BASE_URL as it's not used here
import { useToast } from '@/hooks/use-toast';
import { API_TIMEOUT_MS } from '@/config/constants'; // Import API_TIMEOUT_MS

const FALLBACK_EXCHANGES: MappedExchange[] = [
  { id: "binance", name: "Binance", enabled: true },
  { id: "hyperliquid", name: "Hyperliquid", enabled: true }
];

export const useExchangeData = () => {
  const [exchanges, setExchanges] = useState<MappedExchange[]>(FALLBACK_EXCHANGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const testAndFetchExchanges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log('useExchangeData: Starting API health check and exchange fetch...');

    try {
      // 1. Test API Health
      console.log('useExchangeData: Testing API health...');
      const healthData = await fetchWrapper("/health", { 
        method: 'GET', 
        timeout: API_TIMEOUT_MS.HEALTH_CHECK 
      }) as ApiHealth;
      console.log('useExchangeData: API Health check result:', healthData);

      if (healthData.status !== 'ok') {
        throw new Error('API health check returned non-ok status');
      }
      
      toast({
        title: "API Connected",
        description: "Successfully connected to the backend API",
      });
      console.log('useExchangeData: API is healthy.');

      // 2. Fetch Supported Exchanges
      console.log('useExchangeData: Fetching supported exchanges...');
      const rawExchanges = await fetchWrapper("/api/exchanges", { 
        method: 'GET', 
        timeout: API_TIMEOUT_MS.FETCH_EXCHANGES 
      }) as ApiExchange[];
      console.log('useExchangeData: Raw exchange data from backend:', rawExchanges);

      const mappedExchanges: MappedExchange[] = rawExchanges.map((ex: ApiExchange) => ({
        id: ex.id || ex.name.toLowerCase(), 
        name: ex.name,
        enabled: ex.enabled !== false, 
      }));
      
      setExchanges(mappedExchanges);
      console.log('useExchangeData: Successfully loaded exchanges:', mappedExchanges);
      toast({
        title: "Exchanges Loaded",
        description: `Loaded ${mappedExchanges.length} supported exchanges`,
      });

    } catch (err) {
      console.error('useExchangeData: Error during API health check or exchange fetch:', err);
      let errorMessage = 'An unknown error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(`API Error: ${errorMessage}. Using fallback exchange list.`);
      setExchanges(FALLBACK_EXCHANGES); 
      
      toast({
        title: "API or Exchange Fetch Failed",
        description: `Error: ${errorMessage}. Using fallback exchange list.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log('useExchangeData: Process finished.');
    }
  }, [toast]); // Removed API_BASE_URL from dependencies as it's not used

  return {
    exchanges,
    isLoadingExchanges: isLoading,
    apiError: error,
    fetchExchanges: testAndFetchExchanges, 
  };
};
