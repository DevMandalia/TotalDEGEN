
import { ExternalLink, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentProjects = () => {
  const projects = [
    {
      id: 1,
      name: "Trading Bot Dashboard",
      description: "Advanced trading analytics and automation platform",
      status: "Active",
      members: 5,
      lastUpdated: "2 hours ago",
      progress: 85,
    },
    {
      id: 2,
      name: "Portfolio Tracker",
      description: "Real-time portfolio monitoring and analysis",
      status: "In Progress",
      members: 3,
      lastUpdated: "1 day ago",
      progress: 60,
    },
    {
      id: 3,
      name: "Risk Management Tool",
      description: "Comprehensive risk assessment and management",
      status: "Planning",
      members: 2,
      lastUpdated: "3 days ago",
      progress: 25,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400";
      case "In Progress":
        return "bg-blue-500/20 text-blue-400";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Projects</h3>
        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-white mb-1">{project.name}</h4>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.members}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{project.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{project.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
