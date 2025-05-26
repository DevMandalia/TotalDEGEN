
import { TrendingUp, Bitcoin, Lock, BarChart3 } from "lucide-react";

const CryptoStats = () => {
  const stats = [
    {
      title: "Market Cap",
      value: "$2475.39B",
      change: "+2.3%",
      changeType: "positive",
      icon: BarChart3,
      subtitle: "vs yesterday"
    },
    {
      title: "Bitcoin Price",
      value: "$61284.23",
      change: "+4.2%",
      changeType: "positive",
      icon: Bitcoin,
      subtitle: "vs yesterday"
    },
    {
      title: "Total Value Locked",
      value: "$46.89B",
      change: "+10.2%",
      changeType: "positive",
      icon: Lock,
      subtitle: "vs yesterday"
    },
    {
      title: "24h Trading Volume",
      value: "$87.29B",
      change: "-2.8%",
      changeType: "negative",
      icon: TrendingUp,
      subtitle: "vs yesterday"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 p-4 rounded-lg hover:bg-gray-800/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">{stat.title}</span>
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-white text-xl font-bold">{stat.value}</p>
              <p className={`text-sm ${
                stat.changeType === "positive" ? "text-green-400" : "text-red-400"
              }`}>
                {stat.change} {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoStats;
