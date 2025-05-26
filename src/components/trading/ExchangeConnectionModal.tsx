import { useState, useEffect } from "react";
import { X, Shield, Wifi, Link, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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

  const API_BASE_URL = "https://3000-i55ier1dg4ii27z5jww1z-a32dc834.manus.computer";

  const connectionModes = [
    { value: "Live", label: "Live Trading", description: "Real money trading" },
    { value: "Testnet", label: "Testnet", description: "Test environment with fake money" },
    { value: "Paper Trading", label: "Paper Trading", description: "Simulated trading" }
  ];

  // Test API health on component mount
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, testing API connection...');
      testApiHealth();
    }
  }, [isOpen]);

  const testApiHealth = async () => {
    try {
      console.log('=== TESTING API HEALTH ===');
      console.log('API Base URL:', API_BASE_URL);
      console.log('Health endpoint:', `${API_BASE_URL}/health`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('Health check response status:', response.status);
      console.log('Health check response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`Health check failed with status: ${response.status} ${response.statusText}`);
      }
      
      const healthData = await response.json();
      console.log('API Health check result:', healthData);
      
      if (healthData.status === 'ok') {
        console.log('API is healthy, fetching exchanges...');
        toast({
          title: "API Connected",
          description: "Successfully connected to the backend API",
        });
        fetchSupportedExchanges();
      } else {
        throw new Error('API health check returned non-ok status');
      }
    } catch (error) {
      console.error('=== API HEALTH CHECK FAILED ===');
      console.error('Error details:', error);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage('API connection timeout (10s)');
        } else if (error.message.includes('fetch')) {
          setErrorMessage('Network error - API server may be down');
        } else {
          setErrorMessage(`API error: ${error.message}`);
        }
      } else {
        setErrorMessage('Unknown API connection error');
      }
      
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
  };

  const fetchSupportedExchanges = async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      console.log('=== FETCHING EXCHANGES ===');
      console.log('Exchanges endpoint:', `${API_BASE_URL}/api/exchanges`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`${API_BASE_URL}/api/exchanges`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('Exchanges response status:', response.status);
      console.log('Exchanges response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exchanges: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Raw exchange data from backend:', result);
      
      // Check if the response has the expected structure
      const exchangeData = result.data || result;
      console.log('Extracted exchange data:', exchangeData);
      
      // Ensure we have an array to work with
      if (!Array.isArray(exchangeData)) {
        throw new Error('Exchange data is not in the expected array format');
      }
      
      // Map to our Exchange interface
      const mappedExchanges: Exchange[] = exchangeData.map((ex: any) => ({
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
        if (error.name === 'AbortError') {
          setErrorMessage('Exchange fetch timeout (10s)');
        } else {
          setErrorMessage(`Failed to fetch exchanges: ${error.message}`);
        }
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
      console.log('Account endpoint:', `${API_BASE_URL}/api/exchange/account`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${API_BASE_URL}/api/exchange/account`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log('Account check response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to check account permissions: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Account check result:', result);
      
      if (result.success) {
        const isReadOnly = result.isReadOnly || false;
        console.log('API key read-only status:', isReadOnly);
        return isReadOnly;
      } else {
        throw new Error(result.message || "Failed to check account permissions");
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
        
        // Format connection request properly for Binance API
        const connectionRequest = {
          exchange: selectedExchange.toLowerCase(),
          apiKey: apiKey,
          apiSecret: secretKey,
          testnet: connectionMode === "Testnet" // boolean indicating if testnet should be used
        };

        console.log('Connection request body:', { ...connectionRequest, apiKey: '[HIDDEN]', apiSecret: '[HIDDEN]' });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for connection test

        const response = await fetch(`${API_BASE_URL}/api/exchange/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(connectionRequest),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        console.log('Connection response status:', response.status);
        console.log('Connection response headers:', response.headers);

        if (!response.ok) {
          throw new Error(`Connection failed with status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Connection test result:', result);
        
        // Handle the successful connection
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
          throw new Error(result.message || "Failed to connect to exchange");
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
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMsg = 'Connection timeout (30s)';
        } else {
          errorMsg = error.message;
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
              <p className="text-sm text-red-300">{errorMessage}</p>
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

                  {/* Security Tips */}
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-gray-300">
                        <span className="font-medium text-yellow-400">Security Tips:</span> Only use API keys with trading permissions. Never share your secret key. Enable IP restrictions on your exchange account.
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button 
                className={`w-full ${getConnectionButtonColor()} text-white font-medium flex items-center gap-2`}
                disabled={isLoading || (connectionMode !== "Paper Trading" && (!selectedExchange || !apiKey || !secretKey))}
                onClick={testConnection}
              >
                {connectionStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                {connectionStatus === 'error' && <AlertCircle className="w-4 h-4" />}
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
