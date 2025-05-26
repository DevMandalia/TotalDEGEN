
const RecentlyAddedProjects = () => {
  const projects = [
    { 
      name: "Ethena", 
      symbol: "ENA", 
      rank: "#78", 
      score: 7.8, 
      price: "$0.62", 
      change: "+8.7%", 
      positive: true,
      scoreColor: "bg-yellow-500"
    },
    { 
      name: "Dyson", 
      symbol: "DYS", 
      rank: "#126", 
      score: 6.9, 
      price: "$1.24", 
      change: "-4.2%", 
      positive: false,
      scoreColor: "bg-yellow-500"
    },
    { 
      name: "Wormhole", 
      symbol: "W", 
      rank: "#65", 
      score: 8.2, 
      price: "$0.89", 
      change: "+12.3%", 
      positive: true,
      scoreColor: "bg-green-500"
    },
    { 
      name: "Jupiter", 
      symbol: "JUP", 
      rank: "#52", 
      score: 8.7, 
      price: "$0.74", 
      change: "+15.3%", 
      positive: true,
      scoreColor: "bg-green-500"
    },
    { 
      name: "Eigenlayer", 
      symbol: "EIGEN", 
      rank: "#89", 
      score: 7.4, 
      price: "$2.18", 
      change: "+3.5%", 
      positive: true,
      scoreColor: "bg-yellow-500"
    },
    { 
      name: "Blast", 
      symbol: "BLAST", 
      rank: "#142", 
      score: 6.8, 
      price: "$0.32", 
      change: "-2.8%", 
      positive: false,
      scoreColor: "bg-yellow-500"
    },
    { 
      name: "Pyth", 
      symbol: "PYTH", 
      rank: "#74", 
      score: 8.5, 
      price: "$0.56", 
      change: "+7.6%", 
      positive: true,
      scoreColor: "bg-green-500"
    },
  ];

  return (
    <div className="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-white text-lg font-semibold">📊 Recently Added Projects</span>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-700/50">
              <th className="text-left py-3">Project</th>
              <th className="text-left py-3">Rank</th>
              <th className="text-left py-3">Broker Score</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.symbol} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{project.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{project.name}</p>
                      <p className="text-gray-400 text-sm">{project.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-300">{project.rank}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-2 ${project.scoreColor} rounded-full`}></div>
                    <span className="text-white text-sm">{project.score}</span>
                  </div>
                </td>
                <td className="py-4 text-white">{project.price}</td>
                <td className="py-4">
                  <span className={`${project.positive ? "text-green-400" : "text-red-400"}`}>
                    {project.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyAddedProjects;
