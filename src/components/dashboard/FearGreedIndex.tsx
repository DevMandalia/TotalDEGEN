
const FearGreedIndex = () => {
  const score = 72;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        <span className="text-gray-300 font-medium">Fear & Greed Index</span>
      </div>
      
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#22C55E"
            strokeWidth="12"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white text-3xl font-bold">{score}</span>
          <span className="text-green-400 font-medium">Greed</span>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 text-sm">Yesterday: 65 ↗ 7</p>
      </div>
    </div>
  );
};

export default FearGreedIndex;
