
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
    if (value === 1) return "bg-blue-600";
    if (value > 0.7) return "bg-green-600";
    if (value > 0.3) return "bg-green-500";
    if (value > 0) return "bg-green-400";
    if (value > -0.3) return "bg-red-400";
    if (value > -0.7) return "bg-red-500";
    return "bg-red-600";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Correlation Matrix ({timeframe})</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>-1.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <span>0.0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>1.0</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid grid-cols-9 gap-1 min-w-full">
          {/* Header row */}
          <div></div>
          {cryptos.map((crypto) => (
            <div key={crypto} className="text-center text-sm font-medium p-2">
              {crypto}
            </div>
          ))}
          
          {/* Data rows */}
          {cryptos.map((crypto1) => (
            <>
              <div key={crypto1} className="text-sm font-medium p-2 flex items-center">
                {crypto1}
              </div>
              {cryptos.map((crypto2) => {
                const correlation = getCorrelation(crypto1, crypto2);
                return (
                  <div
                    key={`${crypto1}-${crypto2}`}
                    className={`${getCorrelationColor(correlation)} p-2 text-center text-white text-xs font-medium rounded transition-all hover:scale-105 cursor-pointer`}
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
      
      <div className="mt-6 text-sm text-gray-400">
        <p>• Correlation values range from -1 (perfect negative correlation) to +1 (perfect positive correlation)</p>
        <p>• Data is calculated based on {timeframe} price movements</p>
        <p>• Click on any cell to see detailed correlation analysis</p>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
