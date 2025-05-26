
import { Clock, User, FileText, TrendingUp } from "lucide-react";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "user",
      message: "New user registered",
      time: "2 hours ago",
      icon: User,
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "report",
      message: "Monthly report generated",
      time: "4 hours ago",
      icon: FileText,
      color: "text-green-400",
    },
    {
      id: 3,
      type: "performance",
      message: "Performance increased by 15%",
      time: "6 hours ago",
      icon: TrendingUp,
      color: "text-purple-400",
    },
    {
      id: 4,
      type: "system",
      message: "System maintenance completed",
      time: "8 hours ago",
      icon: Clock,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-white/10 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{activity.message}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
