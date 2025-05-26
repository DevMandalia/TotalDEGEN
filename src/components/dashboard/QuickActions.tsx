
import { Plus, Download, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const actions = [
    {
      title: "New Project",
      description: "Create a new project",
      icon: Plus,
      color: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
    },
    {
      title: "Export Data",
      description: "Download your data",
      icon: Download,
      color: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
    },
    {
      title: "Share Report",
      description: "Share with team",
      icon: Share2,
      color: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
    },
    {
      title: "Settings",
      description: "Manage preferences",
      icon: Settings,
      color: "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30",
    },
  ];

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.title}
              variant="ghost"
              className="w-full justify-start h-auto p-4 hover:bg-white/10"
            >
              <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-white">{action.title}</p>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
