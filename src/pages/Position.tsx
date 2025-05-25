
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, TrendingUp, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import TradingNavigation from "@/components/trading/TradingNavigation";
import DetailedPositionChart from "@/components/trading/DetailedPositionChart";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";

const Position = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Mock position data - in real app this would come from props/params
  const [position] = useState({
    symbol: "BTC",
    name: "Bitcoin",
    side: "LONG" as const,
    size: 0.0234,
    entryPrice: 94500.00,
    currentPrice: 97842.91,
    leverage: "10x",
    breakeven: 94650.00,
    liquidation: 85050.00,
    stopLoss: 89000.00,
    takeProfit: 105000.00,
    pnl: 782.45,
    pnlPercent: 8.27,
    isProfit: true,
    marginUsed: 2213.45,
    unrealizedPnl: 782.45,
    fees: 12.34,
    fundingFees: -2.45
  });

  const orderTypes = [
    { type: "Market Buy", color: "bg-green-600 hover:bg-green-700", icon: TrendingUp },
    { type: "Market Sell", color: "bg-red-600 hover:bg-red-700", icon: TrendingUp },
    { type: "Limit Buy", color: "bg-blue-600 hover:bg-blue-700", icon: Target },
    { type: "Limit Sell", color: "bg-purple-600 hover:bg-purple-700", icon: Target },
    { type: "Stop Loss", color: "bg-orange-600 hover:bg-orange-700", icon: Shield },
    { type: "Take Profit", color: "bg-yellow-600 hover:bg-yellow-700", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
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
            className="hover:bg-gray-800 border border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">{position.symbol}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {position.name} Position
              </h1>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  position.side === 'LONG' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  {position.side}
                </span>
                <span className="text-gray-400">{position.leverage}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Chart Section */}
          <div className="xl:col-span-3">
            <Card className="bg-gray-900 border border-gray-800 p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                    ${position.currentPrice.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    {position.isProfit ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      ${Math.abs(position.pnl).toFixed(2)} ({position.pnlPercent}%)
                    </span>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold"
                  onClick={() => {/* Handle hedging ideas */}}
                >
                  💡 Hedging Ideas
                </Button>
              </div>
              <DetailedPositionChart 
                symbol={position.symbol}
                entryPrice={position.entryPrice}
                stopLoss={position.stopLoss}
                takeProfit={position.takeProfit}
                currentPrice={position.currentPrice}
              />
            </Card>

            {/* Position Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gray-900 border border-gray-800 p-4">
                <div className="text-gray-400 text-xs font-medium mb-1">Size</div>
                <div className="text-white font-bold text-lg">{position.size} {position.symbol}</div>
              </Card>
              <Card className="bg-gray-900 border border-gray-800 p-4">
                <div className="text-gray-400 text-xs font-medium mb-1">Entry Price</div>
                <div className="text-blue-400 font-bold text-lg">${position.entryPrice.toLocaleString()}</div>
              </Card>
              <Card className="bg-gray-900 border border-gray-800 p-4">
                <div className="text-gray-400 text-xs font-medium mb-1">Margin Used</div>
                <div className="text-yellow-400 font-bold text-lg">${position.marginUsed.toFixed(2)}</div>
              </Card>
              <Card className="bg-gray-900 border border-gray-800 p-4">
                <div className="text-gray-400 text-xs font-medium mb-1">Unrealized PnL</div>
                <div className={`font-bold text-lg ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  ${position.unrealizedPnl.toFixed(2)}
                </div>
              </Card>
            </div>

            {/* Risk Management */}
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Risk Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-gray-400 text-xs font-medium mb-1">Stop Loss</div>
                  <div className="text-red-400 font-bold text-lg">${position.stopLoss.toLocaleString()}</div>
                  <div className="text-gray-500 text-xs">
                    -{((position.entryPrice - position.stopLoss) / position.entryPrice * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-medium mb-1">Take Profit</div>
                  <div className="text-green-400 font-bold text-lg">${position.takeProfit.toLocaleString()}</div>
                  <div className="text-gray-500 text-xs">
                    +{((position.takeProfit - position.entryPrice) / position.entryPrice * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-medium mb-1">Liquidation</div>
                  <div className="text-red-500 font-bold text-lg">${position.liquidation.toLocaleString()}</div>
                  <div className="text-gray-500 text-xs">
                    -{((position.entryPrice - position.liquidation) / position.entryPrice * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Types Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Order Types
              </h3>
              <div className="space-y-3">
                {orderTypes.map((order, index) => {
                  const IconComponent = order.icon;
                  return (
                    <Button
                      key={index}
                      className={`w-full ${order.color} text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center gap-2`}
                      onClick={() => {/* Handle order type */}}
                    >
                      <IconComponent className="w-4 h-4" />
                      {order.type}
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-900 border border-gray-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Breakeven</span>
                  <span className="text-yellow-400 font-medium">${position.breakeven.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Trading Fees</span>
                  <span className="text-gray-300 font-medium">${position.fees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Funding Fees</span>
                  <span className={`font-medium ${position.fundingFees < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    ${position.fundingFees.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Total PnL</span>
                    <span className={`font-bold ${position.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                      ${(position.pnl - position.fees + position.fundingFees).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
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
