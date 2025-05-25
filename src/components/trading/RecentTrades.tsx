
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const RecentTrades = () => {
  const [showMore, setShowMore] = useState(false);
  
  const recentTrades = [
    {
      symbol: "BTC",
      side: "BUY",
      size: "0.0156",
      price: 96500.00,
      total: 1505.40,
      time: "2 min ago",
      status: "Filled"
    },
    {
      symbol: "ETH",
      side: "SELL",
      size: "1.234",
      price: 3478.90,
      total: 4293.04,
      time: "15 min ago",
      status: "Filled"
    },
    {
      symbol: "SOL",
      side: "BUY",
      size: "8.45",
      price: 225.60,
      total: 1906.32,
      time: "1 hour ago",
      status: "Filled"
    },
    {
      symbol: "ADA",
      side: "BUY",
      size: "1500.00",
      price: 0.87,
      total: 1305.00,
      time: "2 hours ago",
      status: "Filled"
    },
    {
      symbol: "DOT",
      side: "SELL",
      size: "45.67",
      price: 7.89,
      total: 360.34,
      time: "3 hours ago",
      status: "Filled"
    },
    {
      symbol: "LINK",
      side: "BUY",
      size: "23.45",
      price: 15.67,
      total: 367.47,
      time: "4 hours ago",
      status: "Filled"
    },
    {
      symbol: "MATIC",
      side: "SELL",
      size: "567.89",
      price: 0.89,
      total: 505.42,
      time: "5 hours ago",
      status: "Filled"
    },
    {
      symbol: "AVAX",
      side: "BUY",
      size: "12.34",
      price: 42.56,
      total: 525.23,
      time: "6 hours ago",
      status: "Filled"
    },
    {
      symbol: "UNI",
      side: "SELL",
      size: "34.56",
      price: 8.92,
      total: 308.28,
      time: "7 hours ago",
      status: "Filled"
    },
    {
      symbol: "ATOM",
      side: "BUY",
      size: "67.89",
      price: 9.45,
      total: 641.57,
      time: "8 hours ago",
      status: "Filled"
    }
  ];

  const displayedTrades = showMore ? recentTrades : recentTrades.slice(0, 10);

  return (
    <Card className="bg-black border border-gray-800 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm text-gray-400">Recent Order History</h3>
        {!showMore && recentTrades.length > 10 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMore(true)}
            className="text-green-500 hover:text-green-400"
          >
            Show 10 more
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {displayedTrades.map((trade, index) => (
          <div key={index} className="grid grid-cols-6 gap-4 py-2 text-sm border-b border-gray-800 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-xs">{trade.symbol}</span>
              </div>
              <div>
                <div className="font-medium">{trade.symbol}</div>
                <div className={`text-xs ${trade.side === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                  {trade.side}
                </div>
              </div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Size</div>
              <div>{trade.size}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Price</div>
              <div>${trade.price.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Total</div>
              <div>${trade.total.toFixed(2)}</div>
            </div>
            
            <div>
              <div className="text-gray-400 text-xs">Status</div>
              <div className="text-green-500">{trade.status}</div>
            </div>
            
            <div className="text-right">
              <div className="text-gray-400 text-xs">{trade.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      {showMore && (
        <div className="mt-4 text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowMore(false)}
            className="text-gray-400 hover:text-white"
          >
            Show less
          </Button>
        </div>
      )}
    </Card>
  );
};

export default RecentTrades;
