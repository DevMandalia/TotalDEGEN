import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Center,
  Icon,
  VStack
} from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { binanceClient } from '../../lib/BinanceClient';

interface OpenPositionsProps {
  positions: any[];
}

const OpenPositions: React.FC<OpenPositionsProps> = ({ positions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localPositions, setLocalPositions] = useState<any[]>([]);

  useEffect(() => {
    setLocalPositions(positions);
  }, [positions]);

  // Refresh positions data
  const refreshPositions = async () => {
    if (!binanceClient.isConnected()) return;
    
    setIsLoading(true);
    try {
      const freshPositions = await binanceClient.getPositions();
      setLocalPositions(freshPositions);
    } catch (error) {
      console.error('Error refreshing positions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh positions every 30 seconds
  useEffect(() => {
    if (!binanceClient.isConnected()) return;
    
    const interval = setInterval(() => {
      refreshPositions();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Center py={8}>
        <Spinner size="lg" color="blue.400" />
      </Center>
    );
  }

  if (!localPositions || localPositions.length === 0) {
    return (
      <Center py={8}>
        <VStack spacing={3}>
          <Icon as={FaExclamationTriangle} boxSize={8} color="gray.500" />
          <Text color="gray.500" textAlign="center">
            No open positions found
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th color="gray.400">Symbol</Th>
            <Th color="gray.400" isNumeric>Size</Th>
            <Th color="gray.400" isNumeric>Entry Price</Th>
            <Th color="gray.400" isNumeric>Mark Price</Th>
            <Th color="gray.400" isNumeric>PnL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {localPositions.map((position, index) => {
            const positionAmt = parseFloat(position.positionAmt);
            const entryPrice = parseFloat(position.entryPrice);
            const markPrice = parseFloat(position.markPrice);
            const pnl = parseFloat(position.unRealizedProfit);
            const isLong = positionAmt > 0;
            
            return (
              <Tr key={index}>
                <Td>
                  <Flex align="center">
                    <Badge colorScheme={isLong ? 'green' : 'red'} mr={2}>
                      {isLong ? 'LONG' : 'SHORT'}
                    </Badge>
                    <Text fontWeight="medium">{position.symbol}</Text>
                  </Flex>
                </Td>
                <Td isNumeric fontWeight="medium">
                  {Math.abs(positionAmt).toFixed(4)}
                </Td>
                <Td isNumeric>{entryPrice.toFixed(2)}</Td>
                <Td isNumeric>{markPrice.toFixed(2)}</Td>
                <Td isNumeric color={pnl >= 0 ? 'green.400' : 'red.400'} fontWeight="bold">
                  {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OpenPositions;
