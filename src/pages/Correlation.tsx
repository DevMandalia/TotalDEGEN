
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <AnimatedBackground />

      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/trading')}
              className="hover:bg-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-medium">Crypto Correlation Matrix</h1>
              <p className="text-gray-400">Analyze correlations between cryptocurrencies</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {["7d", "30d", "90d", "1y"].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className={timeframe === period ? "bg-green-600 hover:bg-green-700" : "border-gray-600"}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected List */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 mb-6">
          <SelectedCryptoList />
        </Card>

        {/* Correlation Matrix */}
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50">
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
