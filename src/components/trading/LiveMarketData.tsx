
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const LiveMarketData = () => {
  const cryptos = [
    { symbol: "BTC", price: 97842.91, change: 2.34, isUp: true },
    { symbol: "ETH", price: 3456.78, change: -1.12, isUp: false },
    { symbol: "SOL", price: 234.56, change: 4.21, isUp: true },
    { symbol: "ADA", price: 0.89, change: 0.87, isUp: true },
    { symbol: "DOT", price: 7.23, change: -2.45, isUp: false },
  ];

  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-4">Live Market Data</h3>
      <div className="space-y-3">
        {cryptos.map((crypto, index) => (
          <div key={crypto.symbol} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{crypto.symbol}</span>
              </div>
              <span className="text-sm font-medium">{crypto.symbol}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                ${crypto.price.toLocaleString()}
              </div>
              <div className={`flex items-center gap-1 text-xs ${
                crypto.isUp ? 'text-green-500' : 'text-red-500'
              }`}>
                {crypto.isUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {Math.abs(crypto.change)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarketData;
