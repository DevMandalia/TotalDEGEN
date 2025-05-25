
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Action } from "../types";

interface ActionRowProps {
  action: Action;
  onRemove: (id: string) => void;
  onEdit: () => void;
  actionType: 'true' | 'false';
}

const ActionRow = ({ action, onRemove, onEdit, actionType }: ActionRowProps) => {
  const getActionDescription = () => {
    if (!action.symbol || !action.side || !action.orderType) {
      return (
        <Button
          onClick={onEdit}
          className={`backdrop-blur-sm bg-gradient-to-r transition-all duration-300 shadow-lg w-full ${
            actionType === 'true'
              ? 'from-green-500/30 to-emerald-500/30 border border-green-400/50 text-green-200 hover:from-green-500/50 hover:to-emerald-500/50 hover:border-green-400/80 hover:text-green-100'
              : 'from-red-500/30 to-rose-500/30 border border-red-400/50 text-red-200 hover:from-red-500/50 hover:to-rose-500/50 hover:border-red-400/80 hover:text-red-100'
          }`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Action
        </Button>
      );
    }
    
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

  const isConfigured = action.symbol && action.side && action.orderType;

  if (!isConfigured) {
    return (
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3">
        {getActionDescription()}
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div 
          className={`text-sm font-medium cursor-pointer flex-1 ${actionType === 'true' ? 'text-green-200' : 'text-red-200'}`}
          onClick={onEdit}
        >
          {getActionDescription()}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(action.id)}
          className="hover:bg-red-500/20 text-red-400 w-6 h-6 ml-2"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ActionRow;
