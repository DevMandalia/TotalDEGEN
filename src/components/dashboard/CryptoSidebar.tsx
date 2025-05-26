
import { BarChart3, TrendingUp, Users, Target, Settings, PieChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const CryptoSidebar = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: PieChart, label: "Project List" },
    { icon: TrendingUp, label: "Top ROI" },
    { icon: Activity, label: "Trending" },
  ];

  const analyticsItems = [
    { icon: BarChart3, label: "Market Insights" },
    { icon: PieChart, label: "Portfolios" },
    { icon: Activity, label: "Social Trends" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900/50 backdrop-blur-sm border-r border-gray-800/50 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CA</span>
        </div>
        <span className="text-white font-semibold">ChainAgent</span>
      </div>

      <div className="space-y-6">
        <div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={`w-full justify-start text-left ${
                    item.active 
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Analytics</h3>
          <div className="space-y-1">
            {analyticsItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CryptoSidebar;
