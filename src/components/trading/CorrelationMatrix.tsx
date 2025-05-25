
interface CorrelationMatrixProps {
  timeframe: string;
}

const CorrelationMatrix = ({ timeframe }: CorrelationMatrixProps) => {
  const cryptos = ["BTC", "ETH", "SOL", "ADA", "DOT", "AVAX", "LINK", "MATIC"];
  
  // Mock correlation data (in a real app, this would come from an API)
  const getCorrelation = (crypto1: string, crypto2: string) => {
    if (crypto1 === crypto2) return 1;
    // Generate mock correlation between -1 and 1
    const hash = crypto1.charCodeAt(0) + crypto2.charCodeAt(0);
    return ((hash % 200) - 100) / 100;
  };

  const getCorrelationColor = (value: number) => {
    if (value === 1) return "bg-gradient-to-r from-blue-600/80 to-indigo-600/80 backdrop-blur-md border border-white/20";
    if (value > 0.7) return "bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md border border-white/20";
    if (value > 0.3) return "bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-md border border-white/20";
    if (value > 0) return "bg-gradient-to-r from-green-400/80 to-green-500/80 backdrop-blur-md border border-white/20";
    if (value > -0.3) return "bg-gradient-to-r from-red-400/80 to-red-500/80 backdrop-blur-md border border-white/20";
    if (value > -0.7) return "bg-gradient-to-r from-red-500/80 to-red-600/80 backdrop-blur-md border border-white/20";
    return "bg-gradient-to-r from-red-600/80 to-red-700/80 backdrop-blur-md border border-white/20";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          Correlation Matrix ({timeframe})
        </h3>
        <div className="flex items-center gap-4 text-xs backdrop-blur-md bg-white/5 border border-white/20 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-red-600/80 to-red-700/80 rounded border border-white/20"></div>
            <span className="text-gray-300 font-medium">-1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-gray-600/80 to-gray-700/80 rounded border border-white/20"></div>
            <span className="text-gray-300 font-medium">0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-600/80 to-emerald-600/80 rounded border border-white/20"></div>
            <span className="text-gray-300 font-medium">1.0</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-9 gap-2 min-w-full">
          {/* Header row */}
          <div></div>
          {cryptos.map((crypto) => (
            <div key={crypto} className="text-center text-sm font-bold p-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {crypto}
              </span>
            </div>
          ))}
          
          {/* Data rows */}
          {cryptos.map((crypto1) => (
            <>
              <div key={crypto1} className="text-sm font-bold p-3 flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {crypto1}
                </span>
              </div>
              {cryptos.map((crypto2) => {
                const correlation = getCorrelation(crypto1, crypto2);
                return (
                  <div
                    key={`${crypto1}-${crypto2}`}
                    className={`${getCorrelationColor(correlation)} p-3 text-center text-white text-xs font-bold rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl`}
                    title={`${crypto1} vs ${crypto2}: ${correlation.toFixed(2)}`}
                  >
                    {correlation.toFixed(2)}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-400 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 shadow-lg">
        <p className="mb-2">• <span className="text-gray-300 font-medium">Correlation values range from -1 (perfect negative correlation) to +1 (perfect positive correlation)</span></p>
        <p className="mb-2">• <span className="text-gray-300 font-medium">Data is calculated based on {timeframe} price movements</span></p>
        <p>• <span className="text-gray-300 font-medium">Click on any cell to see detailed correlation analysis</span></p>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
