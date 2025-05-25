
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";

interface DetailedPositionChartProps {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  currentPrice: number;
}

const DetailedPositionChart = ({ 
  symbol, 
  entryPrice, 
  stopLoss, 
  takeProfit, 
  currentPrice 
}: DetailedPositionChartProps) => {
  const [timeframe, setTimeframe] = useState("1D");
  
  // Generate mock price data around the entry price
  const generatePriceData = () => {
    const data = [];
    const basePrice = entryPrice;
    const volatility = basePrice * 0.02; // 2% volatility
    
    for (let i = 0; i < 100; i++) {
      const time = new Date(Date.now() - (100 - i) * 15 * 60 * 1000); // 15-min intervals
      const randomChange = (Math.random() - 0.5) * volatility;
      const trend = i > 80 ? (currentPrice - basePrice) / 20 : 0; // Trend towards current price
      const price = basePrice + randomChange + trend * (i - 80);
      
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: Math.max(price, 0),
        volume: Math.random() * 1000000
      });
    }
    
    // Ensure the last point is the current price
    data[data.length - 1].price = currentPrice;
    
    return data;
  };

  const chartData = generatePriceData();

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {["1H", "4H", "1D", "1W", "1M"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className={`text-xs px-3 py-1 font-mono ${
                timeframe === period 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700"
              }`}
            >
              {period}
            </Button>
          ))}
        </div>
        <div className="text-sm text-gray-400 font-mono">
          {symbol}/USDT • Real-time
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-96 w-full bg-black rounded-lg border border-gray-800 p-4">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={10}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={10}
                domain={['dataMin - 1000', 'dataMax + 1000']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Price"]}
              />
              
              {/* Price Line */}
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#10B981" }}
              />
              
              {/* Entry Price Line */}
              <ReferenceLine 
                y={entryPrice} 
                stroke="#3B82F6" 
                strokeDasharray="8 8" 
                strokeWidth={2}
                label={{ value: `Entry: $${entryPrice.toLocaleString()}`, position: "top", fill: "#3B82F6" }}
              />
              
              {/* Take Profit Line */}
              <ReferenceLine 
                y={takeProfit} 
                stroke="#10B981" 
                strokeDasharray="8 8" 
                strokeWidth={2}
                label={{ value: `TP: $${takeProfit.toLocaleString()}`, position: "top", fill: "#10B981" }}
              />
              
              {/* Stop Loss Line */}
              <ReferenceLine 
                y={stopLoss} 
                stroke="#EF4444" 
                strokeDasharray="8 8" 
                strokeWidth={2}
                label={{ value: `SL: $${stopLoss.toLocaleString()}`, position: "top", fill: "#EF4444" }}
              />
              
              {/* Current Price Line */}
              <ReferenceLine 
                y={currentPrice} 
                stroke="#F59E0B" 
                strokeWidth={3}
                label={{ value: `Current: $${currentPrice.toLocaleString()}`, position: "top", fill: "#F59E0B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-blue-400">Entry Price</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-green-500"></div>
          <span className="text-green-400">Take Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-red-500"></div>
          <span className="text-red-400">Stop Loss</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-yellow-500"></div>
          <span className="text-yellow-400">Current Price</span>
        </div>
      </div>
    </div>
  );
};

export default DetailedPositionChart;
