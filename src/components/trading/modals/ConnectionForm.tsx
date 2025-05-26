// src/components/trading/modals/ConnectionForm.tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Shield } from "lucide-react";
import { MappedExchange } from "@/services/api";
import { CONNECTION_MODES } from '@/config/constants'; // Import the constant

// The ConnectionMode type is now inferred from the constant, so this interface is removed.
// interface ConnectionMode {
//   value: string;
//   label: string;
//   description: string;
// }

interface ConnectionFormProps {
  connectionMode: string;
  setConnectionMode: (value: string) => void;
  // Use the imported constant for stricter typing. 'readonly' makes it immutable.
  connectionModes: readonly typeof CONNECTION_MODES[number][]; 
  selectedExchange: string;
  setSelectedExchange: (value: string) => void;
  exchanges: MappedExchange[]; 
  isLoadingExchanges: boolean;
  apiKey: string;
  setApiKey: (value: string) => void;
  showApiKey: boolean;
  setShowApiKey: (value: boolean) => void;
  secretKey: string;
  setSecretKey: (value: string) => void;
  showSecretKey: boolean;
  setShowSecretKey: (value: boolean) => void;
}

export const ConnectionForm = ({
  connectionMode,
  setConnectionMode,
  connectionModes,
  selectedExchange,
  setSelectedExchange,
  exchanges,
  isLoadingExchanges,
  apiKey,
  setApiKey,
  showApiKey,
  setShowApiKey,
  secretKey,
  setSecretKey,
  showSecretKey,
  setShowSecretKey,
}: ConnectionFormProps) => {
  return (
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
          Exchange Platform {isLoadingExchanges && <span className="text-blue-400">(Loading...)</span>}
        </label>
        <Select value={selectedExchange} onValueChange={setSelectedExchange} disabled={isLoadingExchanges}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select an exchange" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {exchanges.map((exchange) => (
              <SelectItem 
                key={exchange.id} 
                value={exchange.id} 
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
    </div>
  );
};
