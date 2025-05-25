
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, X, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Condition } from "../types";

interface ConditionRowProps {
  condition: Condition;
  index: number;
  totalConditions: number;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onToggleParenthesis: (id: string, type: 'open' | 'close') => void;
  onAddCondition: (connector: string) => void;
  assetSearchOpen: boolean;
  setAssetSearchOpen: (open: boolean) => void;
  assetSearchTerm: string;
  setAssetSearchTerm: (term: string) => void;
}

const ConditionRow = ({
  condition,
  index,
  totalConditions,
  onRemove,
  onUpdate,
  onToggleParenthesis,
  onAddCondition,
  assetSearchOpen,
  setAssetSearchOpen,
  assetSearchTerm,
  setAssetSearchTerm
}: ConditionRowProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-2 justify-center group">
        {/* Open Parenthesis */}
        <button
          onClick={() => onToggleParenthesis(condition.id, 'open')}
          className={`w-8 h-8 rounded border transition-all duration-200 ${
            condition.hasOpenParen 
              ? 'bg-gradient-to-r from-blue-500/50 to-purple-500/50 border-blue-400/80 text-blue-100' 
              : 'bg-white/5 border-white/20 text-gray-400 opacity-0 group-hover:opacity-100'
          }`}
        >
          (
        </button>
        
        {/* Asset/Parameter Selector */}
        <Dialog open={assetSearchOpen} onOpenChange={setAssetSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 w-40 justify-start">
              {condition.type || "Select Asset"}
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Select Asset or Parameter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search assets or indicators..."
                  value={assetSearchTerm}
                  onChange={(e) => setAssetSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {/* Filtered assets and parameters will be rendered here */}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Select value={condition.operator} onValueChange={(value) => onUpdate(condition.id, 'operator', value)}>
          <SelectTrigger className="w-16 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
            <SelectItem value=">" className="text-white hover:bg-white/10">{">"}</SelectItem>
            <SelectItem value="<" className="text-white hover:bg-white/10">{"<"}</SelectItem>
            <SelectItem value="=" className="text-white hover:bg-white/10">{"="}</SelectItem>
            <SelectItem value=">=" className="text-white hover:bg-white/10">{">="}</SelectItem>
            <SelectItem value="<=" className="text-white hover:bg-white/10">{"<="}</SelectItem>
            <SelectItem value="!=" className="text-white hover:bg-white/10">{"!="}</SelectItem>
          </SelectContent>
        </Select>
        
        <Input
          placeholder="Value"
          value={condition.value}
          onChange={(e) => onUpdate(condition.id, 'value', e.target.value)}
          className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400 w-40"
        />
        
        {/* Close Parenthesis */}
        <button
          onClick={() => onToggleParenthesis(condition.id, 'close')}
          className={`w-8 h-8 rounded border transition-all duration-200 ${
            condition.hasCloseParen 
              ? 'bg-gradient-to-r from-blue-500/50 to-purple-500/50 border-blue-400/80 text-blue-100' 
              : 'bg-white/5 border-white/20 text-gray-400 opacity-0 group-hover:opacity-100'
          }`}
        >
          )
        </button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(condition.id)}
          className="hover:bg-red-500/20 text-red-400"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Connectors below each condition */}
      {index < totalConditions - 1 ? (
        <div className="flex justify-center gap-4">
          <ToggleGroup type="single" value={condition.connector} onValueChange={(value) => value && onUpdate(condition.id, 'connector', value)}>
            <ToggleGroupItem 
              value="and" 
              className="backdrop-blur-sm bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 text-emerald-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500/60 data-[state=on]:to-teal-500/60 data-[state=on]:border-emerald-400/80 data-[state=on]:text-emerald-100"
            >
              AND
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="or" 
              className="backdrop-blur-sm bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 text-amber-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-amber-500/60 data-[state=on]:to-orange-500/60 data-[state=on]:border-amber-400/80 data-[state=on]:text-amber-100"
            >
              OR
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      ) : (
        condition.connector && (
          <div className="flex justify-center">
            <Button
              onClick={() => onAddCondition("")}
              className="backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-purple-500/50 hover:border-blue-400/80 hover:text-blue-100 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Condition {totalConditions + 1}
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default ConditionRow;
