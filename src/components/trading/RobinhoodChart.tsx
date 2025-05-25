
import { useState } from "react";
import { Button } from "@/components/ui/button";

const RobinhoodChart = () => {
  const [timeframe, setTimeframe] = useState("1W");
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono">
      {/* Timeframe buttons */}
      <div className="flex gap-1 mb-8">
        {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((period) => (
          <Button
            key={period}
            variant="ghost"
            size="sm"
            onClick={() => setTimeframe(period)}
            className={`text-sm px-4 py-2 h-8 font-medium transition-all ${
              timeframe === period 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700" 
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {period}
          </Button>
        ))}
      </div>
      
      {/* Enhanced Chart area with TradingView-style design */}
      <div className="h-96 relative bg-black rounded-lg border border-gray-800">
        <svg className="w-full h-full" viewBox="0 0 800 300">
          {/* Grid lines - TradingView style */}
          <defs>
            <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#1a1a1a" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Chart line with gradient */}
          <path
            d="M40,240 Q120,220 200,180 T360,160 T520,140 T680,120 T760,100"
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="3"
            className="drop-shadow-lg"
          />
          
          {/* Fill area under the curve */}
          <path
            d="M40,240 Q120,220 200,180 T360,160 T520,140 T680,120 T760,100 L760,300 L40,300 Z"
            fill="url(#fillGradient)"
          />
          
          {/* Glow effect */}
          <path
            d="M40,240 Q120,220 200,180 T360,160 T520,140 T680,120 T760,100"
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="1"
            opacity="0.6"
            className="blur-sm"
          />
          
          {/* Data points */}
          {[
            { x: 200, y: 180 },
            { x: 360, y: 160 },
            { x: 520, y: 140 },
            { x: 680, y: 120 }
          ].map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="url(#chartGradient)"
              className="drop-shadow-md"
            />
          ))}
        </svg>
        
        {/* Price labels */}
        <div className="absolute top-4 left-4 text-gray-400 text-xs font-mono">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            $97,842.91
          </div>
          <div className="text-green-400 text-sm">+2.34%</div>
        </div>
      </div>
    </div>
  );
};

export default RobinhoodChart;
