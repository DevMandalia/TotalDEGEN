import { useState, useEffect } from "react";
import { X, Shield, Wifi, Link, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "../../lib/api";

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Exchange {
  id: string;
  name: string;
  enabled: boolean;
}

interface ConnectionState {
  connected: boolean;
  exchange: string;
  sessionToken: string;
  isReadOnly: boolean;
}

const ExchangeConnectionModal = ({ isOpen, onClose }: ExchangeConnectionModalProps) => {
  const [selectedExchange, setSelectedExchange] = useState("");
  const [connectionMode, setConnectionMode] = useState("Live");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionState, setConnectionState] = useState<ConnectionState | null>(null);
  const { toast } = useToast();

  const connectionModes = [
    { value: "Live", label: "Live Trading", description: "Real money trading" },
    { value: "Testnet", label: "Testnet", description: "Test environment with fake money" },
    { value: "Paper Trading", label: "Paper Trading", description: "Simulated trading" }
  ];
  
  // Test API health on component mount
  useEffect(() => {
    console.log('Modal opened, testing API connection...');
    testApiHealth();
  }, []);

  const setApiError = (message: string) => {
    setErrorMessage(message);
  };

  const testApiHealth = async () => {
    try {
      console.log('=== TESTING API HEALTH ===');
      // Using centralized API client
      
      setIsLoading(true);
      const healthData = await api.checkHealth();
      
      if (healthData && healthData.status === 'ok') {
        console.log('API is healthy, fetching exchanges...');
        toast({
          title: "API Connected",
          description: "Successfully connected to API server",
        });
        
        fetchSupportedExchanges();
      } else {
        console.error('=== API HEALTH CHECK FAILED ===');
        console.error('Error details:', healthData);
        setApiError("API server is not responding correctly");
        
        // Show toast and use fallback exchange list
        toast({
          title: "API Connection Failed",
          description: "Using fallback exchange list",
          variant: "destructive",
        });
        
        // Fallback to basic exchange list
        setExchanges([
          { id: "binance", name: "Binance", enabled: true },
          { id: "hyperliquid", name: "Hyperliquid", enabled: true }
        ]);
      }
    } catch (error) {
      console.error('=== API HEALTH CHECK FAILED ===');
      console.error('Error details:', error);
      setApiError("Network Error");
      
      // Show toast and use fallback exchange list
      toast({
        title: "API Connection Failed",
        description: "Using fallback exchange list",
        variant: "destructive",
      });
      
      // Fallback to basic exchange list
      setExchanges([
        { id: "binance", name: "Binance", enabled: true },
        { id: "hyperliquid", name: "Hyperliquid", enabled: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSupportedExchanges = async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      console.log('=== FETCHING EXCHANGES ===');
      
      const exchanges = await api.getSupportedExchanges();
      
      // Map to our Exchange interface if needed
      const mappedExchanges: Exchange[] = exchanges.map((ex: any) => ({
        id: ex.id || ex.name.toLowerCase(),
        name: ex.name,
        enabled: ex.enabled !== false // Default to enabled unless explicitly disabled
      }));
      
      setExchanges(mappedExchanges);
      console.log('Successfully loaded exchanges:', mappedExchanges);
      
      toast({
        title: "Exchanges Loaded",
        description: `Loaded ${mappedExchanges.length} supported exchanges`,
      });
      
    } catch (error) {
      console.error('=== EXCHANGE FETCH FAILED ===');
      console.error('Error details:', error);
      
      if (error instanceof Error) {
        setErrorMessage(`Failed to fetch exchanges: ${error.message}`);
      } else {
        setErrorMessage('Unknown error fetching exchanges');
      }
      
      // Fallback to basic exchange list
      console.log('Using fallback exchange list');
      setExchanges([
        { id: "binance", name: "Binance", enabled: true },
        { id: "hyperliquid", name: "Hyperliquid", enabled: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to check read-only status
  const checkReadOnlyStatus = async (sessionToken: string) => {
    try {
      console.log('=== CHECKING API KEY PERMISSIONS ===');
      
      // Using mock implementation since this endpoint isn't in our backend yet
      const result = { success: true, isReadOnly: false };
      
      if (result.success) {
        console.log('API key read-only status:', result.isReadOnly);
        return result.isReadOnly;
      } else {
        throw new Error(result.error || "Failed to check account permissions");
      }
    } catch (error) {
      console.error('=== PERMISSION CHECK FAILED ===');
      console.error('Error details:', error);
      // Don't fail the entire connection for permission check issues
      return false; // Assume not read-only if we can't determine
    }
  };

  // Add function to save connection state
  const saveConnectionState = (state: ConnectionState) => {
    setConnectionState(state);
    console.log('Connection state saved:', state);
    
    // Store in localStorage for persistence
    localStorage.setItem('exchangeConnection', JSON.stringify(state));
  };

  // Add function to show read-only warning
  const showReadOnlyWarning = () => {
    toast({
      title: "Read-Only API Key Detected",
      description: "Your API key has read-only permissions. Trading functions will be disabled.",
      variant: "destructive",
    });
  };

  const testConnection = async () => {
    if (!selectedExchange || (connectionMode !== "Paper Trading" && (!apiKey || !secretKey))) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setConnectionStatus('connecting');
    setErrorMessage("");

    try {
      console.log('=== TESTING CONNECTION ===');
      console.log('Exchange:', selectedExchange);
      console.log('Mode:', connectionMode);
      
      if (connectionMode === "Paper Trading") {
        // For paper trading, just simulate success
        console.log('Paper trading mode - simulating connection');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setConnectionStatus('success');
        console.log('Paper trading connection successful');
        
        // Save paper trading connection state
        saveConnectionState({
          connected: true,
          exchange: selectedExchange.toLowerCase(),
          sessionToken: 'paper-trading-token',
          isReadOnly: false
        });
        
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${selectedExchange} in Paper Trading mode`,
        });
      } else {
        // For live/testnet, test actual connection using backend API
        console.log(`Testing ${connectionMode} connection via backend API`);
        
        // Use the API client to connect to the exchange
        // If API key and secret are not provided in the form, use the ones from env variables
        const useApiKey = apiKey || import.meta.env.VITE_BINANCE_API_KEY;
        const useSecretKey = secretKey || import.meta.env.VITE_BINANCE_SECRET_KEY;
        
        const result = await api.connectExchange(
          selectedExchange.toLowerCase(),
          useApiKey,
          useSecretKey,
          connectionMode === "Testnet"
        );
        
        if (result.success) {
          // Store the session token for subsequent authenticated requests
          const sessionToken = result.token;
          console.log('Connection successful, received session token');
          
          // Check if API key is read-only
          const isReadOnly = await checkReadOnlyStatus(sessionToken);
          
          // Store both the session token and read-only status
          saveConnectionState({
            connected: true,
            exchange: selectedExchange.toLowerCase(),
            sessionToken,
            isReadOnly
          });
          
          setConnectionStatus('success');
          
          // Update UI based on read-only status
          if (isReadOnly) {
            showReadOnlyWarning();
          }
          
          toast({
            title: "Connection Successful",
            description: `Successfully connected to ${selectedExchange} in ${connectionMode} mode${isReadOnly ? ' (Read-Only)' : ''}`,
          });
        } else {
          // Handle connection failure
          throw new Error(result.error || "Failed to connect to exchange");
        }
      }
      
      // Clear form after successful connection
      setTimeout(() => {
        setApiKey("");
        setSecretKey("");
        setConnectionStatus('idle');
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('=== CONNECTION ERROR ===');
      console.error('Error details:', error);
      setConnectionStatus('error');
      
      let errorMsg = 'Connection failed';
      let errorType = 'general';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMsg = 'Connection timeout (30s)';
          errorType = 'timeout';
        } else {
          errorMsg = error.message;
          
          // Check for geographic restriction errors
          if (error.message && (
              error.message.includes('restricted location') || 
              error.message.includes('geographic restriction') ||
              error.message.includes('Service unavailable from a restricted location')
          )) {
            errorType = 'geographic';
            errorMsg = 'This service is unavailable in your current location due to Binance geographic restrictions. Please check Binance Terms of Service for details.';
          }
          // Check for API key permission errors
          else if (error.message && (
              error.message.includes('API key') || 
              error.message.includes('permission') ||
              error.message.includes('Invalid API-key')
          )) {
            errorType = 'permission';
            errorMsg = 'API key error: Please check that your API key has the correct permissions and is valid.';
          }
        }
      }
      
      setErrorMessage(errorMsg);
      
      toast({
        title: "Connection Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConnectionButtonText = () => {
    switch (connectionStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'success':
        return 'Connected!';
      case 'error':
        return 'Try Again';
      default:
        return 'Connect Exchange';
    }
  };

  const getConnectionButtonColor = () => {
    switch (connectionStatus) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600';
      default:
        return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-700 text-white max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <Link className="w-3 h-3 text-white" />
            </div>
            <DialogTitle className="text-lg font-semibold">Exchange Account Connection</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Security Notice */}
          <div className="bg-gray-800 rounded-lg p-3 flex items-start gap-3">
            <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-300">
              Your API keys are encrypted and stored securely. We never store your secret keys in plain text.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-300">
                <p className="font-medium mb-1">Connection Error</p>
                <p>{errorMessage}</p>
                {errorMessage.includes('geographic restrictions') && (
                  <p className="mt-2 text-xs">
                    This is a limitation of Binance's terms of service, not an issue with your credentials or our application.
                    <a 
                      href="https://www.binance.com/en/terms" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-1 text-blue-400 hover:text-blue-300 underline"
                    >
                      View Binance Terms of Service
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Current Connections */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-4 h-4 text-gray-400" />
              <h3 className="font-medium text-white">Current Connections</h3>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-300">No active connections</span>
              </div>
              <span className="text-xs text-red-400">Disconnected</span>
            </div>
          </div>

          {/* Add New Connection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-4 h-4 text-gray-400" />
              <h3 className="font-medium text-white">Add New Exchange Connection</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Connection Mode</label>
                <Select value={connectionMode} onValueChange={setConnectionMode}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select connection mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {connectionModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value} className="text-white">
                        <div>
                          <div>{mode.label}</div>
                          <div className="text-xs text-gray-400">{mode.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Exchange Platform {isLoading && <span className="text-blue-400">(Loading...)</span>}
                </label>
                <Select value={selectedExchange} onValueChange={setSelectedExchange} disabled={isLoading}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select an exchange" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {exchanges.map((exchange) => (
                      <SelectItem 
                        key={exchange.id} 
                        value={exchange.name} 
                        className="text-white"
                        disabled={!exchange.enabled}
                      >
                        {exchange.name} {!exchange.enabled && "(Coming Soon)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {connectionMode !== "Paper Trading" && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">API Key</label>
                    <div className="relative">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key"
                        className="bg-gray-800 border-gray-700 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Secret Key</label>
                    <div className="relative">
                      <Input
                        type={showSecretKey ? "text" : "password"}
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Enter your secret key"
                        className="bg-gray-800 border-gray-700 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showSecretKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Security Tips */}
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-300">
                  Security Tips: Only use API keys with trading permissions. Never share your secret key. Enable IP restrictions on your exchange account.
                </p>
              </div>

              <Button
                onClick={testConnection}
                disabled={isLoading || connectionStatus === 'connecting' || connectionStatus === 'success'}
                className={`w-full py-6 ${getConnectionButtonColor()} text-white font-medium transition-all duration-300`}
              >
                {getConnectionButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeConnectionModal;
