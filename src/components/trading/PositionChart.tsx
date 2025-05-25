
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PositionChartProps {
  symbol: string;
}

const PositionChart = ({ symbol }: PositionChartProps) => {
  const [timeframe, setTimeframe] = useState("1D");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {["1D", "1W", "1M", "3M", "1Y"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className={`text-xs px-3 py-1 ${
                timeframe === period 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Placeholder for chart */}
      <div className="h-80 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-3xl mb-2">📊</div>
          <p className="text-gray-400">{symbol} Price Chart</p>
          <p className="text-sm text-gray-500">TradingView chart would integrate here</p>
        </div>
      </div>
    </div>
  );
};

export default PositionChart;
