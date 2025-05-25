
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const OpenPositions = () => {
  const positions = [
    {
      symbol: "BTC",
      side: "LONG",
      size: "0.0234",
      entryPrice: 94500.00,
      currentPrice: 97842.91,
      leverage: "10x",
      breakeven: 94650.00,
      liquidation: 85050.00,
      pnl: 782.45,
      pnlPercent: 8.27,
      isProfit: true
    },
    {
      symbol: "ETH",
      side: "SHORT",
      size: "2.456",
      entryPrice: 3500.00,
      currentPrice: 3456.78,
      leverage: "5x",
      breakeven: 3480.00,
      liquidation: 4200.00,
      pnl: 531.23,
      pnlPercent: 6.19,
      isProfit: true
    },
    {
      symbol: "SOL",
      side: "LONG",
      size: "15.67",
      entryPrice: 220.00,
      currentPrice: 234.56,
      leverage: "3x",
      breakeven: 223.30,
      liquidation: 146.67,
      pnl: 228.20,
      pnlPercent: 6.62,
      isProfit: true
    }
  ];

  return (
    <Card className="bg-gray-900 border border-gray-800 p-6 font-mono">
      <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Open Positions</h3>
      
      <div className="space-y-4">
        {positions.map((position, index) => (
          <div key={index} className="grid grid-cols-8 gap-4 py-4 border-b border-gray-800 last:border-b-0 text-sm bg-black rounded-lg px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{position.symbol}</span>
              </div>
              <div>
                <div className="font-bold text-white">{position.symbol}</div>
                <div className={`text-xs font-medium ${position.side === 'LONG' ? 'text-green-400' : 'text-red-400'}`}>
                  {position.side}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Size</div>
              <div className="text-white font-medium">{position.size}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Entry</div>
              <div className="text-white font-medium">${position.entryPrice.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Current</div>
              <div className="text-white font-medium">${position.currentPrice.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Leverage</div>
              <div className="text-blue-400 font-bold">{position.leverage}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Breakeven</div>
              <div className="text-yellow-400 font-medium">${position.breakeven.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs font-medium">Liquidation</div>
              <div className="text-red-400 font-medium">${position.liquidation.toLocaleString()}</div>
            </div>
            
            <div className="text-right">
              <div className={`flex items-center gap-1 justify-end font-bold ${
                position.isProfit ? 'text-green-400' : 'text-red-400'
              }`}>
                {position.isProfit ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <div>
                  <div className="text-lg">${position.pnl.toFixed(2)}</div>
                  <div className="text-sm">({position.pnlPercent}%)</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OpenPositions;
