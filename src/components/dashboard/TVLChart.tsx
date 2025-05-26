
const TVLChart = () => {
  return (
    <div className="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300 font-medium">Total Value Locked</span>
      </div>
      
      <div className="text-white text-2xl font-bold mb-6">$46.89B</div>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Semi-circle progress */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeDasharray="141.37 141.37"
            strokeDashoffset="70.68"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="8"
            strokeDasharray="141.37 141.37"
            strokeDashoffset="100"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-lg font-bold">TVL Change</span>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="text-center">
          <p className="text-gray-400">Daily</p>
          <p className="text-green-400 font-medium">↗ 10.2%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Weekly</p>
          <p className="text-green-400 font-medium">↗ 68.7%</p>
        </div>
      </div>
    </div>
  );
};

import { Lock } from "lucide-react";
export default TVLChart;
