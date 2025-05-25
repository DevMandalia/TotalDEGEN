import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, X, Trash2, MoreHorizontal, Eye, EyeOff, Search, Ampersand } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Condition {
  id: string;
  type: string;
  parameter?: string;
  operator: string;
  value: string;
  connector?: string;
  hasOpenParen?: boolean;
  hasCloseParen?: boolean;
}

interface Action {
  id: string;
  orderType: string;
  side: string;
  symbol: string;
  quantity: string;
  price?: string;
  timeInForce: string;
}

interface Position {
  id: string;
  assetName: string;
  leverage: string;
  entryPrice: number;
  notionalSize: number;
  breakevenPrice: number;
  marginAmount: number;
  marginType: string;
  realTimePnL: number;
  pnLPercent: number;
  liquidationPrice: number;
  side: string;
  currentPrice: number;
  unrealizedPnL: number;
}

interface VisibleParameters {
  assetName: boolean;
  leverage: boolean;
  entryPrice: boolean;
  notionalSize: boolean;
  breakevenPrice: boolean;
  marginAmount: boolean;
  marginType: boolean;
  realTimePnL: boolean;
  pnLPercent: boolean;
  liquidationPrice: boolean;
  side: boolean;
  currentPrice: boolean;
  unrealizedPnL: boolean;
}

const ConditionalTrading = () => {
  const [entryConditions, setEntryConditions] = useState<Condition[]>([
    { id: "1", type: "Open", operator: ">", value: "" }
  ]);
  
  const [trueActions, setTrueActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Buy", symbol: "BTC", quantity: "", timeInForce: "GTC" }
  ]);
  
  const [falseActions, setFalseActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Sell", symbol: "BTC", quantity: "", timeInForce: "GTC" }
  ]);

  const [assetSearchOpen, setAssetSearchOpen] = useState(false);
  const [assetSearchTerm, setAssetSearchTerm] = useState("");

  const addCondition = (connector: string) => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      type: "",
      operator: ">",
      value: "",
      connector
    };
    setEntryConditions([...entryConditions, newCondition]);
  };

  const addAction = (actionType: 'true' | 'false') => {
    const newAction: Action = {
      id: Date.now().toString(),
      orderType: "Market",
      side: actionType === 'true' ? "Buy" : "Sell",
      symbol: "BTC",
      quantity: "",
      timeInForce: "GTC"
    };

    if (actionType === 'true') {
      setTrueActions([...trueActions, newAction]);
    } else {
      setFalseActions([...falseActions, newAction]);
    }
  };

  const removeCondition = (id: string) => {
    setEntryConditions(entryConditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, field: string, value: string) => {
    setEntryConditions(entryConditions.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const toggleParenthesis = (id: string, type: 'open' | 'close') => {
    setEntryConditions(entryConditions.map(c => 
      c.id === id 
        ? { ...c, [type === 'open' ? 'hasOpenParen' : 'hasCloseParen']: !c[type === 'open' ? 'hasOpenParen' : 'hasCloseParen'] }
        : c
    ));
  };

  const renderConditionRow = (condition: Condition, index: number) => (
    <div key={condition.id} className="space-y-4">
      <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-2 justify-center group">
        {/* Open Parenthesis */}
        <button
          onClick={() => toggleParenthesis(condition.id, 'open')}
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
        
        <Select value={condition.operator} onValueChange={(value) => updateCondition(condition.id, 'operator', value)}>
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
          onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
          className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400 w-40"
        />
        
        {/* Close Parenthesis */}
        <button
          onClick={() => toggleParenthesis(condition.id, 'close')}
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
          onClick={() => removeCondition(condition.id)}
          className="hover:bg-red-500/20 text-red-400"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Connectors below each condition */}
      {index < entryConditions.length - 1 ? (
        <div className="flex justify-center gap-4">
          <ToggleGroup type="single" value={condition.connector} onValueChange={(value) => value && updateCondition(condition.id, 'connector', value)}>
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
              onClick={() => addCondition("")}
              className="backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-purple-500/50 hover:border-blue-400/80 hover:text-blue-100 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Condition {entryConditions.length + 1}
            </Button>
          </div>
        )
      )}
    </div>
  );

  return (
    <Card className="backdrop-blur-md bg-white/5 border border-white/20 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Conditional Ordering
        </h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 font-bold transition-all duration-300 text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-md bg-gray-900/90 border border-white/20 p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-white mb-3">Visible Parameters</h4>
              {/* Visible parameters toggle will be rendered here */}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Workflow Layout */}
      <div className="flex flex-col items-center mb-8">
        {/* IF Diamond */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 rotate-45 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-xl font-bold text-white -rotate-45">IF</span>
          </div>
          
          {/* Connecting Lines */}
          <div className="absolute top-1/2 -right-20 w-16 h-0.5 bg-gradient-to-r from-green-400 to-transparent"></div>
          <div className="absolute top-1/2 -left-20 w-16 h-0.5 bg-gradient-to-l from-red-400 to-transparent"></div>
          
          {/* TRUE/FALSE Labels */}
          <div className="absolute top-1/2 -right-32 transform -translate-y-1/2 text-green-400 font-bold text-sm">TRUE</div>
          <div className="absolute top-1/2 -left-32 transform -translate-y-1/2 text-red-400 font-bold text-sm">FALSE</div>
        </div>

        {/* Conditions */}
        <div className="w-full max-w-4xl space-y-4 mb-12">
          {entryConditions.map((condition, index) => renderConditionRow(condition, index))}
        </div>

        {/* Actions Layout */}
        <div className="w-full flex justify-between items-start max-w-6xl">
          {/* FALSE Actions - Left Side */}
          <div className="flex flex-col items-center">
            {/* Connecting Line from IF to Actions Rectangle */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-red-400 to-transparent mb-4"></div>
            
            {/* Actions to Execute Rectangle */}
            <div className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-bold text-red-200 text-center">Actions to Execute</h4>
            </div>
            
            {/* FALSE Action Rows */}
            <div className="space-y-2 w-96">
              {falseActions.map((action) => (
                <div key={action.id} className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-2">
                  {/* Action row content will be rendered here */}
                </div>
              ))}
              
              <div className="flex justify-center">
                <Button
                  onClick={() => addAction('false')}
                  disabled={falseActions.length >= 4}
                  className="backdrop-blur-sm bg-gradient-to-r from-red-500/30 to-rose-500/30 border border-red-400/50 text-red-200 hover:bg-gradient-to-r hover:from-red-500/50 hover:to-rose-500/50 hover:border-red-400/80 hover:text-red-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 hover:shadow-red-500/40 w-12 h-12 rounded-full"
                >
                  <Ampersand className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* TRUE Actions - Right Side */}
          <div className="flex flex-col items-center">
            {/* Connecting Line from IF to Actions Rectangle */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-green-400 to-transparent mb-4"></div>
            
            {/* Actions to Execute Rectangle */}
            <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-bold text-green-200 text-center">Actions to Execute</h4>
            </div>
            
            {/* TRUE Action Rows */}
            <div className="space-y-2 w-96">
              {trueActions.map((action) => (
                <div key={action.id} className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-2">
                  {/* Action row content will be rendered here */}
                </div>
              ))}
              
              <div className="flex justify-center">
                <Button
                  onClick={() => addAction('true')}
                  disabled={trueActions.length >= 4}
                  className="backdrop-blur-sm bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 text-green-200 hover:bg-gradient-to-r hover:from-green-500/50 hover:to-emerald-500/50 hover:border-green-400/80 hover:text-green-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40 w-12 h-12 rounded-full"
                >
                  <Ampersand className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button className="backdrop-blur-md bg-gradient-to-r from-orange-600/80 to-orange-700/80 hover:from-orange-700/80 hover:to-orange-800/80 border border-white/20">
          Place Strategy
        </Button>
        <Button className="backdrop-blur-md bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80 border border-white/20">
          Save Strategy
        </Button>
        <Button className="backdrop-blur-md bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-700/80 hover:to-green-800/80 border border-white/20">
          Set Alerts
        </Button>
      </div>
    </Card>
  );
};

export default ConditionalTrading;
