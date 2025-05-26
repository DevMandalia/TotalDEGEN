
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import TradingNavigation from "@/components/trading/TradingNavigation";
import RobinhoodChart from "@/components/trading/RobinhoodChart";
import OpenPositions from "@/components/trading/OpenPositions";
import RecentTrades from "@/components/trading/RecentTrades";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";
import BackendStatus from "@/components/BackendStatus";
import AnimatedBackground from "@/components/ui/animated-background";

const Trading = () => {
  const [portfolioValue] = useState(8866.42);
  const [dayChange] = useState(116.74);
  const [dayChangePercent] = useState(1.34);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
      <AnimatedBackground />
      
      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="relative z-10">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Portfolio Header */}
            <div className="flex justify-between items-start mb-6">
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
      </div>

      <ExchangeConnectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <BackendStatus />
    </div>
  );
};

export default Trading;
