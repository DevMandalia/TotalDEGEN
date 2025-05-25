import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SelectedCryptoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Default watchlist with positions and user preferences
  const [selectedCryptos, setSelectedCryptos] = useState(() => {
    const saved = localStorage.getItem('crypto-watchlist');
    return saved ? JSON.parse(saved) : [
      'BTC', 'ETH', 'SOL', 'BNB', 'PEPE', 'DOGE'
    ];
  });

  // All available cryptos for search
  const allCryptos = [
    { symbol: "BTC", name: "Bitcoin", price: 45678.90, change: 2.78, volume: "28.5B", marketCap: "894.2B", logo: "₿" },
    { symbol: "ETH", name: "Ethereum", price: 2341.56, change: -1.23, volume: "15.2B", marketCap: "281.4B", logo: "⟠" },
    { symbol: "SOL", name: "Solana", price: 189.34, change: 4.56, volume: "3.8B", marketCap: "84.7B", logo: "◎" },
    { symbol: "BNB", name: "BNB", price: 612.45, change: 1.89, volume: "2.1B", marketCap: "89.2B", logo: "🔶" },
    { symbol: "PEPE", name: "Pepe", price: 0.000021, change: 12.45, volume: "1.8B", marketCap: "8.9B", logo: "🐸" },
    { symbol: "DOGE", name: "Dogecoin", price: 0.087, change: -2.15, volume: "890M", marketCap: "12.4B", logo: "🐕" },
    { symbol: "ADA", name: "Cardano", price: 0.67, change: 1.89, volume: "1.2B", marketCap: "23.8B", logo: "₳" },
    { symbol: "DOT", name: "Polkadot", price: 12.45, change: -0.98, volume: "892M", marketCap: "16.4B", logo: "●" },
    { symbol: "AVAX", name: "Avalanche", price: 78.90, change: 3.21, volume: "1.5B", marketCap: "29.8B", logo: "🔺" },
    { symbol: "LINK", name: "Chainlink", price: 23.45, change: 0.87, volume: "678M", marketCap: "13.7B", logo: "🔗" },
    { symbol: "MATIC", name: "Polygon", price: 1.23, change: -2.15, volume: "456M", marketCap: "11.2B", logo: "🟣" },
    { symbol: "UNI", name: "Uniswap", price: 11.34, change: 3.45, volume: "234M", marketCap: "6.8B", logo: "🦄" },
    { symbol: "LTC", name: "Litecoin", price: 145.67, change: 0.78, volume: "567M", marketCap: "10.7B", logo: "Ł" },
    { symbol: "BCH", name: "Bitcoin Cash", price: 234.56, change: -1.45, volume: "345M", marketCap: "4.6B", logo: "₿" },
    { symbol: "XRP", name: "Ripple", price: 0.56, change: 2.34, volume: "1.2B", marketCap: "31.2B", logo: "◉" }
  ];

  // Get crypto data for selected symbols
  const cryptos = allCryptos.filter(crypto => selectedCryptos.includes(crypto.symbol));

  // Filter cryptos for search
  const filteredCryptos = allCryptos.filter(crypto => 
    (crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())) &&
    !selectedCryptos.includes(crypto.symbol)
  ).slice(0, 10);

  const addCrypto = (symbol: string) => {
    const newList = [...selectedCryptos, symbol];
    setSelectedCryptos(newList);
    localStorage.setItem('crypto-watchlist', JSON.stringify(newList));
    setSearchQuery("");
  };

  const removeCrypto = (symbol: string) => {
    const newList = selectedCryptos.filter(s => s !== symbol);
    setSelectedCryptos(newList);
    localStorage.setItem('crypto-watchlist', JSON.stringify(newList));
  };

  return (
    <div className="p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Selected Cryptocurrencies
        </h3>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-6 gap-4 p-3 border-b border-white/20 mb-2">
        <div className="text-sm font-medium text-gray-400">Asset</div>
        <div className="text-sm font-medium text-gray-400">Price</div>
        <div className="text-sm font-medium text-gray-400">24h Change</div>
        <div className="text-sm font-medium text-gray-400">Volume</div>
        <div className="text-sm font-medium text-gray-400">Market Cap</div>
        <div className="text-sm font-medium text-gray-400 text-right">Actions</div>
      </div>
      
      <div className="grid grid-cols-1 gap-2 mb-4">
        {cryptos.map((crypto) => (
          <div key={crypto.symbol} className="grid grid-cols-6 gap-4 p-3 hover:bg-white/5 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center text-lg backdrop-blur-md border border-white/20">
                <span>{crypto.logo}</span>
              </div>
              <div>
                <div className="font-bold text-white">{crypto.symbol}</div>
                <div className="text-xs text-gray-400">{crypto.name}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="font-medium text-white">${crypto.price.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center gap-1 ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {crypto.change >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">{Math.abs(crypto.change)}%</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-300">${crypto.volume}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-300">${crypto.marketCap}</span>
            </div>
            
            <div className="flex items-center justify-end gap-2">
              <button 
                onClick={() => removeCrypto(crypto.symbol)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded hover:bg-red-400/10"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button - Bottom Left */}
      <div className="flex justify-start">
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-700/80 hover:to-emerald-700/80 font-bold backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add +
        </Button>
      </div>

      {/* Add Crypto Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="backdrop-blur-md bg-gray-900/95 border border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Add Cryptocurrency
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.symbol}
                  onClick={() => addCrypto(crypto.symbol)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 border border-white/10"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center text-sm backdrop-blur-md border border-white/20">
                    <span>{crypto.logo}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{crypto.symbol}</div>
                    <div className="text-xs text-gray-400">{crypto.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">${crypto.price.toLocaleString()}</div>
                    <div className={`text-xs ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredCryptos.length === 0 && searchQuery && (
                <div className="text-center text-gray-400 py-8">
                  No cryptocurrencies found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectedCryptoList;
