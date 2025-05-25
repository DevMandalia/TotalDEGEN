
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Action } from "../types";

interface ActionRowProps {
  action: Action;
  onUpdate: (id: string, field: string, value: string) => void;
  onRemove: (id: string) => void;
  actionType: 'true' | 'false';
}

const ActionRow = ({ action, onUpdate, onRemove, actionType }: ActionRowProps) => {
  const getActionDescription = () => {
    if (!action.symbol || !action.side || !action.orderType) return "Configure order...";
    
    let description = `${action.side} `;
    
    if (action.quantity) {
      description += `${action.quantity} `;
    }
    
    description += `${action.symbol} `;
    
    if (action.orderType === "Market") {
      description += "at market";
    } else if (action.orderType === "Limit" && action.price) {
      description += `at $${action.price}`;
    } else if (action.orderType === "Limit") {
      description += "at limit price";
    }
    
    return description;
  };

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3 space-y-3">
      {/* Action Description */}
      <div className={`text-sm font-medium ${actionType === 'true' ? 'text-green-200' : 'text-red-200'}`}>
        {getActionDescription()}
      </div>
      
      {/* Order Configuration Row 1 */}
      <div className="flex items-center gap-2">
        <Select value={action.side} onValueChange={(value) => onUpdate(action.id, 'side', value)}>
          <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white text-xs">
            <SelectValue placeholder="Side" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <SelectItem value="Buy" className="text-white hover:bg-white/10">Buy</SelectItem>
            <SelectItem value="Sell" className="text-white hover:bg-white/10">Sell</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          placeholder="Qty"
          value={action.quantity}
          onChange={(e) => onUpdate(action.id, 'quantity', e.target.value)}
          className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400 w-16 text-xs"
        />
        
        <Select value={action.symbol} onValueChange={(value) => onUpdate(action.id, 'symbol', value)}>
          <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white text-xs">
            <SelectValue placeholder="Asset" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <SelectItem value="BTC" className="text-white hover:bg-white/10">BTC</SelectItem>
            <SelectItem value="ETH" className="text-white hover:bg-white/10">ETH</SelectItem>
            <SelectItem value="SOL" className="text-white hover:bg-white/10">SOL</SelectItem>
            <SelectItem value="ADA" className="text-white hover:bg-white/10">ADA</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(action.id)}
          className="hover:bg-red-500/20 text-red-400 w-6 h-6"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      
      {/* Order Configuration Row 2 */}
      <div className="flex items-center gap-2">
        <Select value={action.orderType} onValueChange={(value) => onUpdate(action.id, 'orderType', value)}>
          <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white text-xs">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <SelectItem value="Market" className="text-white hover:bg-white/10">Market</SelectItem>
            <SelectItem value="Limit" className="text-white hover:bg-white/10">Limit</SelectItem>
            <SelectItem value="Stop" className="text-white hover:bg-white/10">Stop</SelectItem>
            <SelectItem value="Stop-Limit" className="text-white hover:bg-white/10">Stop-Limit</SelectItem>
          </SelectContent>
        </Select>
        
        {(action.orderType === "Limit" || action.orderType === "Stop" || action.orderType === "Stop-Limit") && (
          <Input
            placeholder="Price"
            value={action.price || ""}
            onChange={(e) => onUpdate(action.id, 'price', e.target.value)}
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400 w-20 text-xs"
          />
        )}
        
        <Select value={action.timeInForce} onValueChange={(value) => onUpdate(action.id, 'timeInForce', value)}>
          <SelectTrigger className="w-16 backdrop-blur-sm bg-white/10 border border-white/20 text-white text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <SelectItem value="GTC" className="text-white hover:bg-white/10">GTC</SelectItem>
            <SelectItem value="IOC" className="text-white hover:bg-white/10">IOC</SelectItem>
            <SelectItem value="FOK" className="text-white hover:bg-white/10">FOK</SelectItem>
            <SelectItem value="DAY" className="text-white hover:bg-white/10">DAY</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ActionRow;
