
import { useState } from "react";
import { Search, Bell, User, Zap, Home, TrendingUp, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";

interface TradingNavigationProps {
  onAccountClick: () => void;
  onSettingsClick?: () => void;
}

const TradingNavigation = ({ onAccountClick, onSettingsClick }: TradingNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [connectionStatus] = useState("Live"); // Can be "Live", "Testnet", or "Paper Trading"

  const navItems = [
    { name: "Dashboard", path: "/trading", icon: Home },
    { name: "Positions", path: "/position", icon: TrendingUp },
    { name: "Markets", path: "/correlation", icon: BarChart3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "text-green-400";
      case "Testnet": return "text-yellow-400";
      case "Paper Trading": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const isConnected = connectionStatus === "Live" || connectionStatus === "Testnet" || connectionStatus === "Paper Trading";

  return (
    <nav className="border-b border-gray-800 bg-black px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onAccountClick}
              className={`w-8 h-8 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center ${
                isConnected ? 'animate-pulse shadow-lg shadow-green-500/50' : ''
              }`}
            >
              <Zap className="w-4 h-4 text-black" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg">TotalDEGEN</span>
              <span className={`text-xs font-medium ${getStatusColor(connectionStatus)}`}>
                {connectionStatus}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? "bg-green-600 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search cryptocurrencies"
              className="pl-10 w-64 bg-gray-900 border-gray-700 focus:border-green-500 text-white"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-800 text-gray-400"
            onClick={onSettingsClick}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TradingNavigation;
