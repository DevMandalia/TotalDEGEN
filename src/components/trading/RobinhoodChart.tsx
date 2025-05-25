
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RobinhoodChart = () => {
  const [timeframe, setTimeframe] = useState("1W");
  
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-4">
      {/* Timeframe buttons */}
      <div className="flex gap-1 mb-6">
        {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((period) => (
          <Button
            key={period}
            variant="ghost"
            size="sm"
            onClick={() => setTimeframe(period)}
            className={`text-xs px-3 py-1 h-7 ${
              timeframe === period 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {period}
          </Button>
        ))}
      </div>
      
      {/* Chart area with green line simulation */}
      <div className="h-64 relative">
        {/* Simulated chart background */}
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Green ascending line similar to Robinhood */}
          <path
            d="M20,180 Q80,160 120,140 T200,120 T280,100 T360,80"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* Subtle glow effect */}
          <path
            d="M20,180 Q80,160 120,140 T200,120 T280,100 T360,80"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1"
            opacity="0.3"
            className="blur-sm"
          />
        </svg>
      </div>
      
      {/* Buying Power */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
        <span className="text-sm text-gray-400">Buying Power</span>
        <span className="text-sm text-white">$0.04</span>
      </div>
    </div>
  );
};

export default RobinhoodChart;
