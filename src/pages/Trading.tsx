import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  useDisclosure,
  Icon,
  HStack,
  VStack,
  Spinner,
  useToast,
  Divider
} from '@chakra-ui/react';
import { FaExchangeAlt, FaSync, FaWallet } from 'react-icons/fa';
import { LineChart } from 'lucide-react';
import ExchangeConnectionModal from '../components/trading/ExchangeConnectionModal';
import TradingNavigation from '../components/trading/TradingNavigation';
import RobinhoodChart from '../components/trading/RobinhoodChart';
import OpenPositions from '../components/trading/OpenPositions';
import { binanceClient } from '../lib/BinanceClient';

const Trading: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState<number | null>(null);
  const [portfolioData, setPortfolioData] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState('1d');
  
  const toast = useToast();

  // Check connection status and load data on mount
  useEffect(() => {
    const checkConnectionAndLoadData = async () => {
      setIsLoading(true);
      
      try {
        // Check if connected to Binance
        if (binanceClient.isConnected()) {
          const connected = await binanceClient.testConnection();
          setIsConnected(connected);
          
          if (connected) {
            // Load data
            await loadData();
          }
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkConnectionAndLoadData();
  }, []);

  // Load data from Binance
  const loadData = async () => {
    try {
      // Get portfolio value
      const portfolio = await binanceClient.getPortfolioValue();
      setPortfolioValue(portfolio.totalValueUSDT);
      
      // Get portfolio history
      const history = await binanceClient.getPortfolioHistory(timeframe);
      setPortfolioData(history.data);
      
      // Get positions
      const positions = await binanceClient.getPositions();
      setPositions(positions);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error loading data',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle connection success
  const handleConnectionSuccess = () => {
    setIsConnected(true);
    loadData();
  };

  // Handle refresh
  const handleRefresh = async () => {
    if (!isConnected) return;
    
    setIsRefreshing(true);
    try {
      await loadData();
      toast({
        title: 'Data refreshed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: 'Error refreshing data',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    
    // Reload portfolio history with new timeframe
    if (isConnected) {
      setIsLoading(true);
      binanceClient.getPortfolioHistory(newTimeframe)
        .then(history => {
          setPortfolioData(history.data);
        })
        .catch(error => {
          console.error('Error loading portfolio history:', error);
          toast({
            title: 'Error loading portfolio history',
            description: error instanceof Error ? error.message : 'Unknown error',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Box bg="gray.900" minH="100vh" color="white">
      <TradingNavigation />
      
      <Box maxW="1400px" mx="auto" px={4} py={6}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Trading Dashboard</Heading>
          
          <HStack spacing={4}>
            <Button
              leftIcon={<FaSync />}
              colorScheme="blue"
              variant="outline"
              size="sm"
              isLoading={isRefreshing}
              loadingText="Refreshing"
              onClick={handleRefresh}
              isDisabled={!isConnected}
            >
              Refresh
            </Button>
            
            <Button
              leftIcon={<FaExchangeAlt />}
              colorScheme="blue"
              size="sm"
              onClick={onOpen}
            >
              {isConnected ? 'Exchange Connected' : 'Connect Exchange'}
            </Button>
          </HStack>
        </Flex>
        
        {isLoading ? (
          <Flex justify="center" align="center" h="60vh">
            <VStack spacing={4}>
              <Spinner size="xl" color="blue.400" thickness="4px" />
              <Text color="gray.400">Loading trading data...</Text>
            </VStack>
          </Flex>
        ) : !isConnected ? (
          <Box
            bg="gray.800"
            borderRadius="lg"
            p={8}
            textAlign="center"
            borderWidth="1px"
            borderColor="gray.700"
            my={10}
          >
            <Icon as={FaExchangeAlt} boxSize={12} color="blue.400" mb={4} />
            <Heading size="md" mb={2}>Connect to an Exchange</Heading>
            <Text color="gray.400" mb={6}>
              Connect to Binance or Hyperliquid to view your portfolio and trading data.
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<FaExchangeAlt />}
              onClick={onOpen}
            >
              Connect Exchange
            </Button>
          </Box>
        ) : (
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={6}
          >
            <GridItem colSpan={{ base: 1, lg: 2 }}>
              <Box
                bg="gray.800"
                borderRadius="lg"
                p={4}
                borderWidth="1px"
                borderColor="gray.700"
                h="full"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">
                    <Flex align="center">
                      <Icon as={LineChart} mr={2} color="blue.400" />
                      Portfolio Value
                    </Flex>
                  </Heading>
                  
                  <HStack spacing={2}>
                    <Button
                      size="xs"
                      colorScheme={timeframe === '1d' ? 'blue' : 'gray'}
                      variant={timeframe === '1d' ? 'solid' : 'outline'}
                      onClick={() => handleTimeframeChange('1d')}
                    >
                      1D
                    </Button>
                    <Button
                      size="xs"
                      colorScheme={timeframe === '7d' ? 'blue' : 'gray'}
                      variant={timeframe === '7d' ? 'solid' : 'outline'}
                      onClick={() => handleTimeframeChange('7d')}
                    >
                      1W
                    </Button>
                    <Button
                      size="xs"
                      colorScheme={timeframe === '30d' ? 'blue' : 'gray'}
                      variant={timeframe === '30d' ? 'solid' : 'outline'}
                      onClick={() => handleTimeframeChange('30d')}
                    >
                      1M
                    </Button>
                    <Button
                      size="xs"
                      colorScheme={timeframe === '90d' ? 'blue' : 'gray'}
                      variant={timeframe === '90d' ? 'solid' : 'outline'}
                      onClick={() => handleTimeframeChange('90d')}
                    >
                      3M
                    </Button>
                    <Button
                      size="xs"
                      colorScheme={timeframe === '1y' ? 'blue' : 'gray'}
                      variant={timeframe === '1y' ? 'solid' : 'outline'}
                      onClick={() => handleTimeframeChange('1y')}
                    >
                      1Y
                    </Button>
                  </HStack>
                </Flex>
                
                <Flex direction="column" mb={4}>
                  <Text fontSize="3xl" fontWeight="bold">
                    ${portfolioValue ? portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    Total Portfolio Value
                  </Text>
                </Flex>
                
                <Box h="300px">
                  <RobinhoodChart data={portfolioData} timeframe={timeframe} />
                </Box>
              </Box>
            </GridItem>
            
            <GridItem>
              <Box
                bg="gray.800"
                borderRadius="lg"
                p={4}
                borderWidth="1px"
                borderColor="gray.700"
                h="full"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md">
                    <Flex align="center">
                      <Icon as={FaWallet} mr={2} color="blue.400" />
                      Open Positions
                    </Flex>
                  </Heading>
                </Flex>
                
                <Divider mb={4} borderColor="gray.700" />
                
                <OpenPositions positions={positions} />
              </Box>
            </GridItem>
          </Grid>
        )}
      </Box>
      
      <ExchangeConnectionModal
        isOpen={isOpen}
        onClose={onClose}
        onConnectionSuccess={handleConnectionSuccess}
      />
    </Box>
  );
};

export default Trading;
