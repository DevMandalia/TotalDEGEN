
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
    <Card className="bg-black border border-gray-800 p-4">
      <h3 className="text-sm text-gray-400 mb-4">Open Positions</h3>
      
      <div className="space-y-3">
        {positions.map((position, index) => (
          <div key={index} className="grid grid-cols-8 gap-4 py-3 border-b border-gray-800 last:border-b-0 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{position.symbol}</span>
              </div>
              <div>
                <div className="font-medium">{position.symbol}</div>
                <div className={`text-xs ${position.side === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                  {position.side}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Size</div>
              <div>{position.size}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Entry</div>
              <div>${position.entryPrice.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Current</div>
              <div>${position.currentPrice.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Leverage</div>
              <div>{position.leverage}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Breakeven</div>
              <div>${position.breakeven.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Liquidation</div>
              <div>${position.liquidation.toLocaleString()}</div>
            </div>
            
            <div className="text-right">
              <div className={`flex items-center gap-1 justify-end ${
                position.isProfit ? 'text-green-500' : 'text-red-500'
              }`}>
                {position.isProfit ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <div>
                  <div>${position.pnl.toFixed(2)}</div>
                  <div className="text-xs">({position.pnlPercent}%)</div>
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
