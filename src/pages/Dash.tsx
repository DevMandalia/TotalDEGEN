
import { useState } from "react";
import TradingNavigation from "@/components/trading/TradingNavigation";
import ExchangeConnectionModal from "@/components/trading/ExchangeConnectionModal";
import SettingsModal from "@/components/trading/SettingsModal";
import AnimatedBackground from "@/components/ui/animated-background";

const Dash = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-mono relative overflow-hidden">
      <AnimatedBackground />
      
      <TradingNavigation 
        onAccountClick={() => setIsModalOpen(true)} 
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
            Dash
          </h1>
          <p className="text-gray-400 mb-8">
            This is your new Dash page. You can integrate the template from the provided link here.
          </p>
          
          {/* Placeholder content - you can replace this with the template components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Template Integration</h3>
              <p className="text-gray-300">
                You can integrate components from the template here. The navigation is now set up and ready.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Custom Content</h3>
              <p className="text-gray-300">
                Add your custom dashboard content and components from the template.
              </p>
            </div>
            
            <div className="backdrop-blur-md bg-white/5 border border-white/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ready to Go</h3>
              <p className="text-gray-300">
                The page is integrated with your existing navigation and styling.
              </p>
            </div>
          </div>
        </div>
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

export default Dash;
