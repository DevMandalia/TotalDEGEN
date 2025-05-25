
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import TradingNavigation from "@/components/trading/TradingNavigation";
import PositionChart from "@/components/trading/PositionChart";
import OrderBook from "@/components/trading/OrderBook";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";

const Position = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [position] = useState({
    symbol: "BTC",
    name: "Bitcoin",
    price: 45678.90,
    change: 1234.56,
    changePercent: 2.78,
    shares: 0.5432,
    value: 24823.45,
    avgCost: 43210.12,
    totalReturn: 1613.33,
    totalReturnPercent: 6.94
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/trading')}
            className="hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-medium">{position.name}</h1>
            <p className="text-gray-400">{position.symbol}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart and Price Info */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 p-6 mb-6">
              <div className="mb-6">
                <div className="text-3xl font-light mb-2">
                  ${position.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  {position.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${position.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${Math.abs(position.change).toLocaleString()} ({position.changePercent}%) Today
                  </span>
                </div>
              </div>
              <PositionChart symbol={position.symbol} />
            </Card>

            {/* Position Details */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 p-6">
              <h3 className="text-lg font-medium mb-4">Your {position.symbol} Position</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Shares</p>
                  <p className="text-lg">{position.shares}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Market Value</p>
                  <p className="text-lg">${position.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average Cost</p>
                  <p className="text-lg">${position.avgCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Return</p>
                  <p className={`text-lg ${position.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${position.totalReturn.toLocaleString()} ({position.totalReturnPercent}%)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 p-6">
              <div className="flex gap-2 mb-4">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  Buy {position.symbol}
                </Button>
                <Button variant="outline" className="flex-1 border-red-600 text-red-500 hover:bg-red-600 hover:text-white">
                  Sell {position.symbol}
                </Button>
              </div>
              <Button variant="outline" className="w-full border-gray-600">
                Trade Options
              </Button>
            </Card>

            <OrderBook symbol={position.symbol} />
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
    </div>
  );
};

export default Position;
