
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Clover } from "lucide-react";
import { Button } from "@/components/ui/button";
import TradingNavigation from "@/components/trading/TradingNavigation";
import RobinhoodChart from "@/components/trading/RobinhoodChart";
import OpenPositions from "@/components/trading/OpenPositions";
import RecentTrades from "@/components/trading/RecentTrades";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";

const Trading = () => {
  const [portfolioValue] = useState(8866.42);
  const [dayChange] = useState(116.74);
  const [dayChangePercent] = useState(1.34);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <TradingNavigation onAccountClick={() => setIsModalOpen(true)} />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Portfolio Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
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
          </div>

          {/* Portfolio Chart */}
          <div className="mb-6">
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

      <ExchangeConnectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Trading;
