import { useState } from "react";
import { X, Shield, Wifi, Link, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const API_URL = "https://3000-i55ier1dg4ii27z5jww1z-a32dc834.manus.computer/api";

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExchangeConnectionModal = ({ isOpen, onClose }: ExchangeConnectionModalProps) => {
  const [selectedExchange, setSelectedExchange] = useState("");
  const [connectionMode, setConnectionMode] = useState("Live");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const exchanges = [
    "Binance",
    "Coinbase Pro",
    "Kraken",
    "Bybit",
    "OKX",
    "KuCoin"
  ];

  const connectionModes = [
    { value: "Live", label: "Live Trading", description: "Real money trading" },
    { value: "Testnet", label: "Testnet", description: "Test environment with fake money" },
    { value: "Paper Trading", label: "Paper Trading", description: "Simulated trading" }
  ];

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
                <label className="block text-sm text-gray-400 mb-2">Exchange Platform</label>
                <Select value={selectedExchange} onValueChange={setSelectedExchange}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select an exchange" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {exchanges.map((exchange) => (
                      <SelectItem key={exchange} value={exchange} className="text-white">
                        {exchange}
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
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium"
                disabled={connectionMode !== "Paper Trading" && (!selectedExchange || !apiKey || !secretKey)}
              >
                Connect Exchange
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeConnectionModal;
