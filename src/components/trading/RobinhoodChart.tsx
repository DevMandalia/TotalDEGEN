import React, { useState, useEffect } from 'react';
import { Box, useToken } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { binanceClient } from '../../lib/BinanceClient';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface RobinhoodChartProps {
  data: any[];
  timeframe: string;
}

const RobinhoodChart: React.FC<RobinhoodChartProps> = ({ data, timeframe }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [blue400, blue200, gray700] = useToken('colors', ['blue.400', 'blue.200', 'gray.700']);

  // Format date based on timeframe
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    
    switch (timeframe) {
      case '1d':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return `${date.getMonth() + 1}/${date.getDate()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      case '30d':
      case '90d':
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case '1y':
        return `${date.getMonth() + 1}/${date.getFullYear().toString().substr(2)}`;
      default:
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  };

  // Process chart data when data prop changes
  useEffect(() => {
    if (!data || data.length === 0) {
      // If no data, load from Binance
      if (binanceClient.isConnected()) {
        binanceClient.getPortfolioHistory(timeframe)
          .then(result => {
            processChartData(result.data);
          })
          .catch(error => {
            console.error('Error loading portfolio history:', error);
            // Use mock data as fallback
            const mockData = generateMockData();
            processChartData(mockData);
          });
      } else {
        // Use mock data if not connected
        const mockData = generateMockData();
        processChartData(mockData);
      }
    } else {
      processChartData(data);
    }
  }, [data, timeframe]);

  // Process chart data
  const processChartData = (chartData: any[]) => {
    if (!chartData || chartData.length === 0) {
      return;
    }
    
    const labels = chartData.map(point => formatDate(point.timestamp));
    const values = chartData.map(point => point.value);
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: values,
          borderColor: blue400,
          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(66, 153, 225, 0.5)');
            gradient.addColorStop(1, 'rgba(66, 153, 225, 0)');
            return gradient;
          },
          pointBackgroundColor: blue400,
          pointBorderColor: '#fff',
          pointBorderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: blue400,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          tension: 0.4,
          fill: true,
          borderWidth: 2,
        },
      ],
    });
  };

  // Generate mock data for testing
  const generateMockData = () => {
    const now = Date.now();
    const mockData = [];
    let numPoints = 24;
    let interval = 60 * 60 * 1000; // 1 hour
    
    switch (timeframe) {
      case '7d':
        numPoints = 7 * 24;
        interval = 60 * 60 * 1000; // 1 hour
        break;
      case '30d':
        numPoints = 30;
        interval = 24 * 60 * 60 * 1000; // 1 day
        break;
      case '90d':
        numPoints = 90;
        interval = 24 * 60 * 60 * 1000; // 1 day
        break;
      case '1y':
        numPoints = 52;
        interval = 7 * 24 * 60 * 60 * 1000; // 1 week
        break;
      default:
        numPoints = 24;
        interval = 60 * 60 * 1000; // 1 hour
    }
    
    let value = 10000;
    for (let i = 0; i < numPoints; i++) {
      const timestamp = now - ((numPoints - i) * interval);
      value = value * (1 + (Math.random() * 0.04 - 0.02)); // -2% to +2% change
      mockData.push({
        timestamp,
        value
      });
    }
    
    return mockData;
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(26, 32, 44, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: gray700,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#718096',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          color: 'rgba(113, 128, 150, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#718096',
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
        beginAtZero: false,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <Box h="100%" w="100%">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <Box h="100%" w="100%" display="flex" alignItems="center" justifyContent="center">
          Loading chart...
        </Box>
      )}
    </Box>
  );
};

export default RobinhoodChart;
