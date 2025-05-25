
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Settings, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TradingNavigation from "@/components/trading/TradingNavigation";
import RobinhoodChart from "@/components/trading/RobinhoodChart";
import OpenPositions from "@/components/trading/OpenPositions";
import RecentTrades from "@/components/trading/RecentTrades";

const Trading = () => {
  const [portfolioValue] = useState(8866.42);
  const [dayChange] = useState(116.74);
  const [dayChangePercent] = useState(1.34);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <TradingNavigation />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Portfolio Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-sm text-gray-400 font-medium">Crypto Portfolio</h1>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                ${portfolioValue.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                {dayChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${Math.abs(dayChange).toFixed(2)} ({dayChangePercent}%) Past month
                </span>
              </div>
            </div>
            <Button variant="outline" className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800 font-medium">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Enlarged Portfolio Chart */}
          <div className="mb-8">
            <RobinhoodChart />
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
