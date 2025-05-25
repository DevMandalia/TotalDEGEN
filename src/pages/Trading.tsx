
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Settings, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TradingNavigation from "@/components/trading/TradingNavigation";
import RobinhoodChart from "@/components/trading/RobinhoodChart";
import LiveMarketData from "@/components/trading/LiveMarketData";
import OpenPositions from "@/components/trading/OpenPositions";
import RecentTrades from "@/components/trading/RecentTrades";

const Trading = () => {
  const [portfolioValue] = useState(8866.42);
  const [dayChange] = useState(116.74);
  const [dayChangePercent] = useState(1.34);

  return (
    <div className="min-h-screen bg-black text-white">
      <TradingNavigation />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Portfolio Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-sm text-gray-400">Crypto Portfolio</h1>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-3xl font-light mb-1">${portfolioValue.toLocaleString()}</div>
              <div className="flex items-center gap-2">
                {dayChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${Math.abs(dayChange).toFixed(2)} ({dayChangePercent}%) Past month
                </span>
              </div>
            </div>
            <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Chart and Market Data Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Portfolio Chart */}
            <div className="col-span-2">
              <RobinhoodChart />
            </div>
            
            {/* Live Market Data */}
            <div>
              <LiveMarketData />
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-6">
            <OpenPositions />
          </div>

          {/* Recent Trades */}
          <RecentTrades />
        </div>
      </div>
    </div>
  );
};

export default Trading;
