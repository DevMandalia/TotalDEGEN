
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import TradingNavigation from "@/components/trading/TradingNavigation";
import CorrelationMatrix from "@/components/trading/CorrelationMatrix";
import SelectedCryptoList from "@/components/trading/SelectedCryptoList";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";
import AnimatedBackground from "@/components/ui/animated-background";

const Correlation = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("30d");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
      <AnimatedBackground />

      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="p-6 relative z-10">
        {/* Header with Glassmorphism */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/trading')}
              className="hover:bg-white/10 border border-white/20 backdrop-blur-md bg-white/5 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                Crypto Correlation Matrix
              </h1>
              <p className="text-gray-400 text-lg">Analyze correlations between cryptocurrencies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2 backdrop-blur-md bg-white/5 border border-white/20 rounded-lg p-2 shadow-lg">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className={
                    timeframe === period 
                      ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-700/80 hover:to-emerald-700/80 font-bold backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg" 
                      : "border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
                  }
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected List with Enhanced Glassmorphism */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/20 mb-6 shadow-2xl">
          <SelectedCryptoList />
        </Card>

        {/* Correlation Matrix with Enhanced Glassmorphism */}
        <Card className="backdrop-blur-md bg-white/5 border border-white/20 shadow-2xl">
          <CorrelationMatrix timeframe={timeframe} />
        </Card>
      </div>

      <ExchangeConnectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Correlation;
