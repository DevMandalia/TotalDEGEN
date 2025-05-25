
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import TradingNavigation from "@/components/trading/TradingNavigation";
import PortfolioChart from "@/components/trading/PortfolioChart";
import WatchList from "@/components/trading/WatchList";
import RecentOrders from "@/components/trading/RecentOrders";

const Trading = () => {
  const [portfolioValue] = useState(127456.78);
  const [dayChange] = useState(2847.92);
  const [dayChangePercent] = useState(2.29);

  return (
    <div className="min-h-screen bg-black text-white">
      <TradingNavigation />
      
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-light">${portfolioValue.toLocaleString()}</h1>
              <div className="flex items-center gap-2 mt-1">
                {dayChange >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ${Math.abs(dayChange).toLocaleString()} ({dayChangePercent}%) Today
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 border-green-600">
                Deposit
              </Button>
              <Button variant="outline" className="border-gray-600">
                Transfer
              </Button>
            </div>
          </div>

          {/* Portfolio Chart */}
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <PortfolioChart />
          </Card>

          {/* Recent Orders */}
          <RecentOrders />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 p-6 border-l border-gray-800">
          <WatchList />
        </div>
      </div>
    </div>
  );
};

export default Trading;
