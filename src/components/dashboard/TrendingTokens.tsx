
const TrendingTokens = () => {
  const tokens = [
    { name: "Solana", symbol: "SOL", change: "+12.4%", type: "Project", positive: true },
    { name: "Render", symbol: "RNDR", change: "+8.7%", type: "Project", positive: true },
    { name: "Arbitrum", symbol: "ARB", change: "-3.2%", type: "Platform", positive: false },
    { name: "Jupiter", symbol: "JUP", change: "+15.3%", type: "Platform", positive: true },
    { name: "Aptos", symbol: "APT", change: "+9.1%", type: "Project", positive: true },
    { name: "Mantle", symbol: "MNT", change: "+6.3%", type: "Platform", positive: true },
    { name: "Base", symbol: "BASE", change: "+21.8%", type: "Platform", positive: true },
    { name: "Celestia", symbol: "TIA", change: "+3.1%", type: "Platform", positive: true },
  ];

  const categories = ["All", "Projects", "Platforms", "Funds"];

  return (
    <div className="backdrop-blur-md bg-gray-800/30 border border-gray-700/50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">📈 Trending</h3>
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                index === 0 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {tokens.map((token) => (
          <div key={token.symbol} className="text-center p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{token.symbol.slice(0, 2)}</span>
            </div>
            <h4 className="text-white font-medium text-sm mb-1">{token.name}</h4>
            <p className="text-gray-400 text-xs mb-1">{token.symbol}</p>
            <p className="text-gray-500 text-xs mb-2">{token.type}</p>
            <p className={`text-xs font-medium ${
              token.positive ? "text-green-400" : "text-red-400"
            }`}>
              {token.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTokens;
