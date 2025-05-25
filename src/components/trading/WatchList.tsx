
import { ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const WatchList = () => {
  const navigate = useNavigate();
  
  const watchlistItems = [
    { symbol: "BTC", name: "Bitcoin", price: 45678.90, change: 2.78 },
    { symbol: "ETH", name: "Ethereum", price: 2341.56, change: -1.23 },
    { symbol: "SOL", name: "Solana", price: 189.34, change: 4.56 },
    { symbol: "ADA", name: "Cardano", price: 0.67, change: 1.89 },
    { symbol: "DOT", name: "Polkadot", price: 12.45, change: -0.98 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Watchlist</h3>
        <Button variant="ghost" size="icon" className="hover:bg-gray-800">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {watchlistItems.map((item) => (
          <Card 
            key={item.symbol}
            className="bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => navigate('/position')}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.symbol}</div>
                <div className="text-sm text-gray-400">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${item.price.toLocaleString()}</div>
                <div className={`text-sm flex items-center gap-1 ${
                  item.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.change >= 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
