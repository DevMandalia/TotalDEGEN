
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+10.5%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      changeType: "negative",
      icon: Target,
    },
    {
      title: "Growth Rate",
      value: "12.5%",
      change: "+5.2%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p
                  className={`text-sm mt-1 ${
                    stat.changeType === "positive" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
