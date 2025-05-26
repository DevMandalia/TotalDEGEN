
import { useState } from "react";
import { Search, RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";
import AnimatedBackground from "@/components/ui/animated-background";
import CryptoSidebar from "@/components/dashboard/CryptoSidebar";
import CryptoStats from "@/components/dashboard/CryptoStats";
import TVLChart from "@/components/dashboard/TVLChart";
import FearGreedIndex from "@/components/dashboard/FearGreedIndex";
import TrendingTokens from "@/components/dashboard/TrendingTokens";
import RecentlyAddedProjects from "@/components/dashboard/RecentlyAddedProjects";

const Dash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <CryptoSidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Your crypto insights for May 26, 2025</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <CryptoStats />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-1">
              <TVLChart />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <FearGreedIndex />
            </div>
          </div>

          {/* Trending Section */}
          <div className="mt-8">
            <TrendingTokens />
          </div>

          {/* Recently Added Projects */}
          <div className="mt-8">
            <RecentlyAddedProjects />
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

export default Dash;
