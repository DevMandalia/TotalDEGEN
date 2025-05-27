import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  useToast as useChakraToast,
  Box,
  Flex,
  Icon,
  Divider as ChakraDivider
} from '@chakra-ui/react';
import { Key, ArrowLeftRight, CheckCircle, XCircle } from 'lucide-react';
import { binanceClient } from '../../lib/BinanceClient';

interface ExchangeConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectionSuccess: () => void;
}

const ExchangeConnectionModal: React.FC<ExchangeConnectionModalProps> = ({
  isOpen,
  onClose,
  onConnectionSuccess
}) => {
  const [exchange, setExchange] = useState('binance');
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  
  const toast = useChakraToast();

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (binanceClient.isConnected()) {
        try {
          const connected = await binanceClient.testConnection();
          setIsConnected(connected);
        } catch (error) {
          console.error('Connection test failed:', error);
          setIsConnected(false);
        }
      }
    };
    
    checkConnection();
  }, [isOpen]);

  const handleConnect = async () => {
    if (!apiKey || !secretKey) {
      setConnectionError('API Key and Secret Key are required');
      return;
    }

    setIsLoading(true);
    setConnectionError('');

    try {
      // Store credentials in the client
      binanceClient.storeCredentials(apiKey, secretKey);
      
      // Test the connection
      const connected = await binanceClient.testConnection();
      
      if (connected) {
        setIsConnected(true);
        toast({
          title: 'Connection Successful',
          description: `Successfully connected to ${exchange === 'binance' ? 'Binance' : 'Hyperliquid'}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Clear form
        setApiKey('');
        setSecretKey('');
        
        // Notify parent component
        onConnectionSuccess();
        
        // Close modal
        onClose();
      } else {
        setConnectionError('Failed to connect. Please check your API keys and try again.');
        binanceClient.clearSession();
      }
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionError(`Connection Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      binanceClient.clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    binanceClient.clearSession();
    setIsConnected(false);
    toast({
      title: 'Disconnected',
      description: `Successfully disconnected from ${exchange === 'binance' ? 'Binance' : 'Hyperliquid'}`,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.900" borderColor="gray.700" borderWidth="1px">
        <ModalHeader color="white">
          <Flex align="center">
            <Icon as={ArrowLeftRight} mr={2} />
            Connect to Exchange
          </Flex>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          {isConnected ? (
            <Box textAlign="center" py={4}>
              <Icon as={CheckCircle} color="green.400" boxSize={12} mb={4} />
              <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>
                Connected to {exchange === 'binance' ? 'Binance' : 'Hyperliquid'}
              </Text>
              <Text color="gray.400" mb={4}>
                Your API connection is active and working properly.
              </Text>
              <Button
                colorScheme="red"
                onClick={handleDisconnect}
                leftIcon={<Icon as={XCircle} />}
              >
                Disconnect
              </Button>
            </Box>
          ) : (
            <VStack gap={4} align="stretch">
              <FormControl>
                <FormLabel color="gray.300">Exchange</FormLabel>
                <Select
                  value={exchange}
                  onChange={(e) => setExchange(e.target.value)}
                  bg="gray.800"
                  color="white"
                  borderColor="gray.600"
                >
                  <option value="binance">Binance</option>
                  <option value="hyperliquid">Hyperliquid</option>
                </Select>
              </FormControl>
              
              <ChakraDivider borderColor="gray.700" />
              
              <Box p={4} bg="gray.800" borderRadius="md">
                <Text color="gray.300" mb={3} fontSize="sm">
                  {exchange === 'binance' 
                    ? 'Enter your Binance API credentials. For security, use read-only API keys.'
                    : 'Enter your Hyperliquid API credentials.'}
                </Text>
                
                <FormControl mb={3}>
                  <FormLabel color="gray.300">API Key</FormLabel>
                  <Input
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4299E1' }}
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel color="gray.300">Secret Key</FormLabel>
                  <Input
                    placeholder="Enter your secret key"
                    type="password"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #4299E1' }}
                  />
                </FormControl>
              </Box>
              
              {connectionError && (
                <Box bg="red.900" p={3} borderRadius="md">
                  <Text color="red.200">{connectionError}</Text>
                </Box>
              )}
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {!isConnected && (
            <HStack gap={3} width="100%">
              <Button variant="outline" colorScheme="blue" onClick={onClose} flex="1">
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handleConnect} 
                isLoading={isLoading}
                loadingText="Connecting"
                leftIcon={<Icon as={Key} />}
                flex="1"
              >
                Connect
              </Button>
            </HStack>
          )}
          {isConnected && (
            <Button variant="ghost" colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExchangeConnectionModal;
