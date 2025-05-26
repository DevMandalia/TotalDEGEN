
import { useState, useEffect } from "react";
import { X, Shield, Wifi, Link, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Exchange {
  id: string;
  name: string;
  enabled: boolean;
}

// Mock data for supported exchanges
const MOCK_EXCHANGES: Exchange[] = [
  { id: "binance", name: "Binance", enabled: true },
  { id: "coinbasepro", name: "Coinbase Pro", enabled: true },
  { id: "kraken", name: "Kraken", enabled: true },
  { id: "bybit", name: "Bybit", enabled: true },
  { id: "okx", name: "OKX", enabled: true },
  { id: "kucoin", name: "KuCoin", enabled: true },
  { id: "huobi", name: "Huobi", enabled: false },
  { id: "ftx", name: "FTX", enabled: false }
];

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

  const connectionModes = [
    { value: "Live", label: "Live Trading", description: "Real money trading" },
    { value: "Testnet", label: "Testnet", description: "Test environment with fake money" },
    { value: "Paper Trading", label: "Paper Trading", description: "Simulated trading" }
  ];

  // Simulate fetching supported exchanges
  useEffect(() => {
    if (isOpen) {
      fetchSupportedExchanges();
    }
  }, [isOpen]);

  const fetchSupportedExchanges = async () => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      console.log('Fetching supported exchanges (mock data)');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setExchanges(MOCK_EXCHANGES);
      console.log('Loaded mock exchanges:', MOCK_EXCHANGES);
      
    } catch (error) {
      console.error('Error loading exchanges:', error);
      setErrorMessage('Failed to load exchanges');
      
      // Still set mock exchanges as fallback
      setExchanges(MOCK_EXCHANGES);
    } finally {
      setIsLoading(false);
    }
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
      console.log('Testing connection to:', selectedExchange);
      
      const payload = {
        exchange: selectedExchange.toLowerCase(),
        mode: connectionMode,
        ...(connectionMode !== "Paper Trading" && {
          apiKey,
          secretKey: '***' // Don't log actual secret
        })
      };

      console.log('Connection payload:', payload);

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate different outcomes based on exchange and mode
      const shouldSucceed = connectionMode === "Paper Trading" || 
                           selectedExchange === "Binance" ||
                           Math.random() > 0.3; // 70% success rate for demo

      if (shouldSucceed) {
        setConnectionStatus('success');
        console.log('Connection successful for:', selectedExchange);
        
        // Clear form after successful connection
        setTimeout(() => {
          setApiKey("");
          setSecretKey("");
          setConnectionStatus('idle');
          onClose();
        }, 2000);
      } else {
        throw new Error(`Connection to ${selectedExchange} failed. Please check your API credentials.`);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Connection failed');
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
                <span className="text-sm text-gray-300">Binance</span>
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
