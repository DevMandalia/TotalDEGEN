
import { useState } from "react";
import TradingNavigation from "@/components/trading/TradingNavigation";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";
import AnimatedBackground from "@/components/ui/animated-background";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentProjects from "@/components/dashboard/RecentProjects";
import PerformanceChart from "@/components/dashboard/PerformanceChart";

const Dash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
      <AnimatedBackground />
      
      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>

          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <PerformanceChart />
              <RecentProjects />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <QuickActions />
              <ActivityFeed />
            </div>
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
