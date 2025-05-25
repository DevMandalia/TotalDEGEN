
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { TrendingUp, Target, Shield, X } from "lucide-react";
import { Action } from "../types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (action: Omit<Action, 'id'>) => void;
  actionType: 'true' | 'false';
}

const OrderModal = ({ isOpen, onClose, onSave, actionType }: OrderModalProps) => {
  const [orderData, setOrderData] = useState({
    side: "",
    symbol: "",
    quantity: "",
    orderType: "",
    price: "",
    timeInForce: "GTC"
  });

  const assets = [
    { symbol: "BTC", name: "Bitcoin", color: "from-orange-500 to-yellow-600" },
    { symbol: "ETH", name: "Ethereum", color: "from-blue-500 to-purple-600" },
    { symbol: "SOL", name: "Solana", color: "from-purple-500 to-pink-600" },
    { symbol: "ADA", name: "Cardano", color: "from-blue-400 to-blue-600" },
    { symbol: "AVAX", name: "Avalanche", color: "from-red-500 to-pink-600" },
    { symbol: "DOT", name: "Polkadot", color: "from-pink-500 to-rose-600" }
  ];

  const orderTypes = [
    { value: "Market", label: "Market Order", icon: TrendingUp, desc: "Execute immediately at current price" },
    { value: "Limit", label: "Limit Order", icon: Target, desc: "Execute at specified price or better" },
    { value: "Stop", label: "Stop Order", icon: Shield, desc: "Trigger when price reaches stop level" },
    { value: "Stop-Limit", label: "Stop-Limit", icon: Shield, desc: "Stop order that becomes limit order" }
  ];

  const handleSave = () => {
    if (orderData.side && orderData.symbol && orderData.quantity && orderData.orderType) {
      onSave(orderData);
      setOrderData({
        side: "",
        symbol: "",
        quantity: "",
        orderType: "",
        price: "",
        timeInForce: "GTC"
      });
      onClose();
    }
  };

  const getOrderSummary = () => {
    if (!orderData.side || !orderData.symbol || !orderData.orderType) return "Configure your order...";
    
    let summary = `${orderData.side} `;
    if (orderData.quantity) summary += `${orderData.quantity} `;
    summary += `${orderData.symbol} `;
    
    if (orderData.orderType === "Market") {
      summary += "at market price";
    } else if (orderData.orderType === "Limit" && orderData.price) {
      summary += `at $${orderData.price}`;
    } else if (orderData.orderType === "Limit") {
      summary += "at limit price";
    }
    
    return summary;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-md bg-gray-900/95 border border-white/20 text-white max-w-2xl font-mono">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
            Create New Order
            <div className={`w-3 h-3 rounded-full ${actionType === 'true' ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="backdrop-blur-sm bg-white/5 border border-white/10 p-4">
            <div className="text-center">
              <div className="text-gray-400 text-sm mb-2">Order Preview</div>
              <div className={`text-lg font-bold ${actionType === 'true' ? 'text-green-200' : 'text-red-200'}`}>
                {getOrderSummary()}
              </div>
            </div>
          </Card>

          {/* Asset Selection */}
          <div className="space-y-3">
            <label className="text-gray-400 text-sm font-medium">Select Asset</label>
            <div className="grid grid-cols-3 gap-3">
              {assets.map((asset) => (
                <Card
                  key={asset.symbol}
                  className={`cursor-pointer transition-all duration-200 p-3 ${
                    orderData.symbol === asset.symbol
                      ? 'backdrop-blur-md bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50'
                      : 'backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setOrderData({...orderData, symbol: asset.symbol})}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${asset.color} flex items-center justify-center`}>
                      <span className="text-xs font-bold text-white">{asset.symbol}</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{asset.symbol}</div>
                      <div className="text-gray-400 text-xs">{asset.name}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Side Selection */}
          <div className="space-y-3">
            <label className="text-gray-400 text-sm font-medium">Order Side</label>
            <div className="grid grid-cols-2 gap-3">
              <Card
                className={`cursor-pointer transition-all duration-200 p-4 ${
                  orderData.side === 'Buy'
                    ? 'backdrop-blur-md bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-400/50'
                    : 'backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setOrderData({...orderData, side: 'Buy'})}
              >
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-green-400 font-bold">BUY</div>
                </div>
              </Card>
              <Card
                className={`cursor-pointer transition-all duration-200 p-4 ${
                  orderData.side === 'Sell'
                    ? 'backdrop-blur-md bg-gradient-to-r from-red-600/30 to-rose-600/30 border border-red-400/50'
                    : 'backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setOrderData({...orderData, side: 'Sell'})}
              >
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-red-400 rotate-180" />
                  <div className="text-red-400 font-bold">SELL</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Order Type Selection */}
          <div className="space-y-3">
            <label className="text-gray-400 text-sm font-medium">Order Type</label>
            <div className="grid grid-cols-2 gap-3">
              {orderTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all duration-200 p-3 ${
                      orderData.orderType === type.value
                        ? 'backdrop-blur-md bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50'
                        : 'backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setOrderData({...orderData, orderType: type.value})}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-white font-bold text-sm">{type.label}</div>
                        <div className="text-gray-400 text-xs">{type.desc}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-400 text-sm font-medium">Quantity</label>
              <Input
                placeholder="Enter quantity"
                value={orderData.quantity}
                onChange={(e) => setOrderData({...orderData, quantity: e.target.value})}
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {(orderData.orderType === "Limit" || orderData.orderType === "Stop" || orderData.orderType === "Stop-Limit") && (
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  {orderData.orderType === "Stop" ? "Stop Price" : "Price"}
                </label>
                <Input
                  placeholder="Enter price"
                  value={orderData.price}
                  onChange={(e) => setOrderData({...orderData, price: e.target.value})}
                  className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            )}
          </div>

          {/* Time in Force */}
          <div className="space-y-2">
            <label className="text-gray-400 text-sm font-medium">Time in Force</label>
            <Select value={orderData.timeInForce} onValueChange={(value) => setOrderData({...orderData, timeInForce: value})}>
              <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                <SelectItem value="GTC" className="text-white hover:bg-white/10">Good Till Canceled (GTC)</SelectItem>
                <SelectItem value="IOC" className="text-white hover:bg-white/10">Immediate or Cancel (IOC)</SelectItem>
                <SelectItem value="FOK" className="text-white hover:bg-white/10">Fill or Kill (FOK)</SelectItem>
                <SelectItem value="DAY" className="text-white hover:bg-white/10">Day Order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!orderData.side || !orderData.symbol || !orderData.quantity || !orderData.orderType}
              className={`flex-1 backdrop-blur-md bg-gradient-to-r font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                actionType === 'true'
                  ? 'from-green-600/80 to-emerald-700/80 hover:from-green-700/80 hover:to-emerald-800/80 border border-green-400/50'
                  : 'from-red-600/80 to-rose-700/80 hover:from-red-700/80 hover:to-rose-800/80 border border-red-400/50'
              }`}
            >
              Create Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
