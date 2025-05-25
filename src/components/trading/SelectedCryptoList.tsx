
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const SelectedCryptoList = () => {
  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", price: 45678.90, change: 2.78, volume: "28.5B", marketCap: "894.2B" },
    { symbol: "ETH", name: "Ethereum", price: 2341.56, change: -1.23, volume: "15.2B", marketCap: "281.4B" },
    { symbol: "SOL", name: "Solana", price: 189.34, change: 4.56, volume: "3.8B", marketCap: "84.7B" },
    { symbol: "ADA", name: "Cardano", price: 0.67, change: 1.89, volume: "1.2B", marketCap: "23.8B" },
    { symbol: "DOT", name: "Polkadot", price: 12.45, change: -0.98, volume: "892M", marketCap: "16.4B" },
    { symbol: "AVAX", name: "Avalanche", price: 78.90, change: 3.21, volume: "1.5B", marketCap: "29.8B" },
    { symbol: "LINK", name: "Chainlink", price: 23.45, change: 0.87, volume: "678M", marketCap: "13.7B" },
    { symbol: "MATIC", name: "Polygon", price: 1.23, change: -2.15, volume: "456M", marketCap: "11.2B" },
  ];

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Selected Cryptocurrencies</h3>
      
      <div className="grid grid-cols-1 gap-2">
        {cryptos.map((crypto) => (
          <div key={crypto.symbol} className="grid grid-cols-6 gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">{crypto.symbol}</span>
              </div>
              <div>
                <div className="font-medium text-sm">{crypto.symbol}</div>
                <div className="text-xs text-gray-400">{crypto.name}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium">${crypto.price.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center gap-1 ${crypto.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.change >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span className="text-sm">{Math.abs(crypto.change)}%</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-300">${crypto.volume}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-300">${crypto.marketCap}</span>
            </div>
            
            <div className="flex items-center justify-end">
              <button className="text-xs text-blue-400 hover:text-blue-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCryptoList;
