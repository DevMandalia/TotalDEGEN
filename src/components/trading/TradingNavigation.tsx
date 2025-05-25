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
  const [connectionStatus] = useState("Live");

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

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Notifications clicked");
    // Add notification functionality here
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Settings clicked");
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <nav className="border-b border-gray-800 bg-black px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onAccountClick}
              className={`w-8 h-8 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center cursor-pointer ${
                isConnected ? 'animate-pulse shadow-lg shadow-green-500/50' : ''
              }`}
            >
              <Zap className="w-4 h-4 text-black" />
            </Button>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg cursor-pointer text-white hover:text-green-400 transition-colors" onClick={() => navigate('/trading')}>TotalDEGEN</span>
              <span className={`text-xs font-medium ${getStatusColor(connectionStatus)}`}>
                {connectionStatus}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <div key={item.name} className="relative">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors cursor-pointer border-none bg-transparent ${
                      isActive 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                  {/* Overlay clickable button */}
                  <button
                    onClick={(e) => handleNavClick(item.path, e)}
                    className="absolute inset-0 z-10 bg-transparent border-none cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    aria-label={`Navigate to ${item.name}`}
                  />
                </div>
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
          
          <div className="relative">
            <button 
              className="hover:bg-gray-800 text-gray-400 cursor-pointer p-2 rounded-md border-none bg-transparent"
              style={{ pointerEvents: 'auto' }}
            >
              <Bell className="w-5 h-5" />
            </button>
            {/* Overlay clickable button */}
            <button
              onClick={handleNotificationClick}
              className="absolute inset-0 z-10 bg-transparent border-none cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Notifications"
            />
          </div>
          
          <div className="relative">
            <button 
              className="hover:bg-gray-800 text-gray-400 cursor-pointer p-2 rounded-md border-none bg-transparent"
              style={{ pointerEvents: 'auto' }}
            >
              <Settings className="w-5 h-5" />
            </button>
            {/* Overlay clickable button */}
            <button
              onClick={handleSettingsClick}
              className="absolute inset-0 z-10 bg-transparent border-none cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Settings"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TradingNavigation;
