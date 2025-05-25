
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const RobinhoodChart = () => {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartMode, setChartMode] = useState("portfolio"); // "portfolio" or "pnl"
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Toggle
            pressed={chartMode === "portfolio"}
            onPressedChange={() => setChartMode("portfolio")}
            className="text-xs px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white"
          >
            Portfolio
          </Toggle>
          <Toggle
            pressed={chartMode === "pnl"}
            onPressedChange={() => setChartMode("pnl")}
            className="text-xs px-3 py-1 data-[state=on]:bg-green-600 data-[state=on]:text-white"
          >
            P&L
          </Toggle>
        </div>
      </div>
      
      {/* Chart area */}
      <div className="h-64 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 animate-pulse"></div>
        </div>
        
        <div className="text-center z-10">
          <div className="text-green-500 text-2xl mb-2">📈</div>
          <p className="text-gray-400">{chartMode === "portfolio" ? "Portfolio" : "P&L"} Chart</p>
          <p className="text-sm text-gray-500">Real chart integration would go here</p>
        </div>
        
        {/* Time period buttons - positioned at bottom right */}
        <div className="absolute bottom-4 right-4 flex gap-1">
          {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className={`text-xs px-2 py-1 h-6 ${
                timeframe === period 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RobinhoodChart;
