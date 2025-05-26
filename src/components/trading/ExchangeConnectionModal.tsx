import { useState, useEffect, useCallback } from "react"; 
import { Wifi, Link, CheckCircle, AlertCircle } from "lucide-react"; // Shield, Eye, EyeOff removed
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Import hooks
import { useExchangeData } from '@/hooks/useExchangeData';
import { useConnectionTest } from '@/hooks/useConnectionTest';

// Import sub-components
import { SecurityNotice } from './modals/SecurityNotice';
import { ConnectionForm } from './modals/ConnectionForm';
import { CONNECTION_MODES } from '@/config/constants'; // Import CONNECTION_MODES

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExchangeConnectionModal = ({ isOpen, onClose }: ExchangeConnectionModalProps) => {
  const [selectedExchange, setSelectedExchange] = useState("");
  const [connectionMode, setConnectionMode] = useState(CONNECTION_MODES[0].value); // Default to first mode from constant
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  // Instantiate hooks
  const { 
    exchanges, 
    isLoadingExchanges, 
    apiError: exchangeApiError, 
    fetchExchanges 
  } = useExchangeData();
  
  const { 
    connectionStatus, 
    isConnecting, 
    connectionError: testConnectionError, 
    testConnection: performHookConnectionTest, 
    resetConnectionStatus 
  } = useConnectionTest();

  // Local definition of connectionModes is removed. Using imported CONNECTION_MODES.

  // Fetch exchanges when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log('Modal opened, fetching exchanges via useExchangeData hook...');
      fetchExchanges();
    }
  }, [isOpen, fetchExchanges]);

  // Handle successful connection: clear form, close modal after delay
  useEffect(() => {
    if (connectionStatus === 'success') {
      const timer = setTimeout(() => {
        setApiKey("");
        setSecretKey("");
        onClose(); 
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [connectionStatus, onClose]);

  // Handle modal close: reset connection status from the hook
  const handleModalClose = useCallback(() => {
    onClose(); 
    resetConnectionStatus(); 
  }, [onClose, resetConnectionStatus]);


  const handleConnect = async () => {
    console.log('Attempting to connect via performHookConnectionTest...');
    await performHookConnectionTest({
      exchange: selectedExchange, 
      mode: connectionMode,
      apiKey,
      secretKey,
    });
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
  
  const displayError = exchangeApiError || testConnectionError;

  return (
    <Dialog open={isOpen} onOpenChange={(openState) => { if (!openState) handleModalClose(); }}>
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
          <SecurityNotice />

          {displayError && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-300">{displayError}</p>
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

            <ConnectionForm
              connectionMode={connectionMode}
              setConnectionMode={setConnectionMode}
              connectionModes={CONNECTION_MODES} // Pass the imported constant
              selectedExchange={selectedExchange}
              setSelectedExchange={setSelectedExchange}
              exchanges={exchanges}
              isLoadingExchanges={isLoadingExchanges}
              apiKey={apiKey}
              setApiKey={setApiKey}
              showApiKey={showApiKey}
              setShowApiKey={setShowApiKey}
              secretKey={secretKey}
              setSecretKey={setSecretKey}
              showSecretKey={showSecretKey}
              setShowSecretKey={setShowSecretKey}
            />

            <div className="mt-4"> 
              <Button 
                className={`w-full ${getConnectionButtonColor()} text-white font-medium flex items-center gap-2`}
                disabled={
                  isLoadingExchanges || 
                  isConnecting || 
                  (connectionMode !== "Paper Trading" && (!selectedExchange || !apiKey || !secretKey)) ||
                  connectionStatus === 'success' 
                }
                onClick={handleConnect}
              >
                {connectionStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                {connectionStatus === 'connecting' && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
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
