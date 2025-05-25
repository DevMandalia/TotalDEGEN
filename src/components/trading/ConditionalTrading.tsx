
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, X, Trash2, Settings, Eye, EyeOff } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Condition {
  id: string;
  type: string;
  parameter?: string;
  operator: string;
  value: string;
}

interface Action {
  id: string;
  type: string;
  symbol?: string;
  orderType: string;
  quantity?: string;
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
  const [timeframe, setTimeframe] = useState("1min");
  const [position, setPosition] = useState("Buy");
  
  const [entryConditions, setEntryConditions] = useState<Condition[]>([
    { id: "1", type: "Open", operator: "10", value: "" }
  ]);
  const [entryConnector, setEntryConnector] = useState("and");
  
  const [exitConditions, setExitConditions] = useState<Condition[]>([
    { id: "1", type: "Close", operator: "10", value: "" }
  ]);
  const [exitConnector, setExitConnector] = useState("and");
  
  const [actions, setActions] = useState<Action[]>([
    { id: "1", type: "Close Position", orderType: "Market", symbol: "BTC" }
  ]);

  // Mock positions data - sorted by notional size
  const [allPositions] = useState<Position[]>([
    {
      id: "1",
      assetName: "BTC",
      leverage: "10x",
      entryPrice: 94500.00,
      notionalSize: 23400.00,
      breakevenPrice: 94650.00,
      marginAmount: 2340.00,
      marginType: "Cross",
      realTimePnL: 782.45,
      pnLPercent: 33.42,
      liquidationPrice: 85050.00,
      side: "LONG",
      currentPrice: 97842.91,
      unrealizedPnL: 782.45
    },
    {
      id: "2",
      assetName: "ETH",
      leverage: "5x",
      entryPrice: 3420.50,
      notionalSize: 17102.50,
      breakevenPrice: 3425.80,
      marginAmount: 3420.50,
      marginType: "Isolated",
      realTimePnL: -156.23,
      pnLPercent: -4.57,
      liquidationPrice: 2736.40,
      side: "LONG",
      currentPrice: 3389.25,
      unrealizedPnL: -156.23
    },
    {
      id: "3",
      assetName: "SOL",
      leverage: "15x",
      entryPrice: 185.40,
      notionalSize: 9270.00,
      breakevenPrice: 186.10,
      marginAmount: 618.00,
      marginType: "Cross",
      realTimePnL: 312.50,
      pnLPercent: 50.57,
      liquidationPrice: 173.20,
      side: "LONG",
      currentPrice: 191.65,
      unrealizedPnL: 312.50
    }
  ]);

  const [visiblePositions, setVisiblePositions] = useState<Position[]>([allPositions[0]]);
  const [visibleParams, setVisibleParams] = useState<VisibleParameters>({
    assetName: true,
    leverage: true,
    entryPrice: true,
    notionalSize: true,
    breakevenPrice: true,
    marginAmount: true,
    marginType: true,
    realTimePnL: true,
    pnLPercent: true,
    liquidationPrice: true,
    side: true,
    currentPrice: false,
    unrealizedPnL: false
  });

  const showMorePositions = () => {
    if (visiblePositions.length < Math.min(allPositions.length, 10)) {
      setVisiblePositions([...visiblePositions, allPositions[visiblePositions.length]]);
    }
  };

  const removePosition = (positionId: string) => {
    setVisiblePositions(visiblePositions.filter(p => p.id !== positionId));
  };

  const toggleParameter = (param: keyof VisibleParameters) => {
    setVisibleParams(prev => ({ ...prev, [param]: !prev[param] }));
  };

  const conditionTypes = [
    "Open", "Close", "High", "Low", "Volume",
    "RSI", "MACD", "ADX", "Bollinger Bands",
    "Moving Average", "Stochastic", "Williams %R"
  ];

  const actionTypes = [
    "Close Position", "Open Position", "Modify Stop Loss",
    "Modify Take Profit", "Cancel Orders", "Send Alert"
  ];

  const addCondition = (type: 'entry' | 'exit') => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      type: "RSI",
      operator: ">",
      value: ""
    };

    if (type === 'entry') {
      if (entryConditions.length < 8) {
        setEntryConditions([...entryConditions, newCondition]);
      }
    } else {
      if (exitConditions.length < 8) {
        setExitConditions([...exitConditions, newCondition]);
      }
    }
  };

  const removeCondition = (id: string, type: 'entry' | 'exit') => {
    if (type === 'entry') {
      setEntryConditions(entryConditions.filter(c => c.id !== id));
    } else {
      setExitConditions(exitConditions.filter(c => c.id !== id));
    }
  };

  const addAction = () => {
    if (actions.length < 4) {
      const newAction: Action = {
        id: Date.now().toString(),
        type: "Close Position",
        orderType: "Market",
        symbol: "BTC"
      };
      setActions([...actions, newAction]);
    }
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const updateCondition = (id: string, field: string, value: string, type: 'entry' | 'exit') => {
    const updateFn = (conditions: Condition[]) =>
      conditions.map(c => c.id === id ? { ...c, [field]: value } : c);
    
    if (type === 'entry') {
      setEntryConditions(updateFn(entryConditions));
    } else {
      setExitConditions(updateFn(exitConditions));
    }
  };

  const updateAction = (id: string, field: string, value: string) => {
    setActions(actions.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const renderPositionParameter = (label: string, value: string | number, isProfit?: boolean) => {
    if (typeof value === 'number') {
      return (
        <div className="min-w-0 flex-1">
          <div className="text-gray-400 text-xs font-medium mb-1 truncate">{label}</div>
          <div className={`font-bold text-sm truncate ${
            isProfit !== undefined 
              ? isProfit ? 'text-green-400' : 'text-red-400'
              : 'text-white'
          }`}>
            {label.includes('Price') || label.includes('PnL') || label.includes('Margin') 
              ? `$${value.toLocaleString()}` 
              : label.includes('%') 
              ? `${value.toFixed(2)}%`
              : value.toLocaleString()}
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-w-0 flex-1">
        <div className="text-gray-400 text-xs font-medium mb-1 truncate">{label}</div>
        <div className="text-white font-bold text-sm truncate">{value}</div>
      </div>
    );
  };

  return (
    <Card className="backdrop-blur-md bg-white/5 border border-white/20 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Conditional Ordering
        </h3>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 font-bold transition-all duration-300 text-white">
              <Settings className="w-4 h-4 mr-2" />
              Parameters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="backdrop-blur-md bg-gray-900/90 border border-white/20 p-4">
            <div className="space-y-2">
              <h4 className="font-medium text-white mb-3">Visible Parameters</h4>
              {Object.entries(visibleParams).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleParameter(key as keyof VisibleParameters)}
                    className="text-white hover:text-blue-400"
                  >
                    {value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <span className="text-sm text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Position Parameters */}
      <div className="space-y-4 mb-6">
        {visiblePositions.map((pos, index) => (
          <div key={pos.id} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-bold">Position {index + 1}</h4>
              {visiblePositions.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePosition(pos.id)}
                  className="hover:bg-red-500/20 text-red-400"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {visibleParams.assetName && renderPositionParameter("Asset", pos.assetName)}
              {visibleParams.side && renderPositionParameter("Side", pos.side)}
              {visibleParams.leverage && renderPositionParameter("Leverage", pos.leverage)}
              {visibleParams.entryPrice && renderPositionParameter("Entry Price", pos.entryPrice)}
              {visibleParams.currentPrice && renderPositionParameter("Current Price", pos.currentPrice)}
              {visibleParams.notionalSize && renderPositionParameter("Notional Size", pos.notionalSize)}
              {visibleParams.breakevenPrice && renderPositionParameter("Breakeven", pos.breakevenPrice)}
              {visibleParams.marginAmount && renderPositionParameter("Margin", pos.marginAmount)}
              {visibleParams.marginType && renderPositionParameter("Margin Type", pos.marginType)}
              {visibleParams.realTimePnL && renderPositionParameter("Real-time PnL", pos.realTimePnL, pos.realTimePnL > 0)}
              {visibleParams.pnLPercent && renderPositionParameter("PnL %", pos.pnLPercent, pos.pnLPercent > 0)}
              {visibleParams.liquidationPrice && renderPositionParameter("Liquidation", pos.liquidationPrice)}
              {visibleParams.unrealizedPnL && renderPositionParameter("Unrealized PnL", pos.unrealizedPnL, pos.unrealizedPnL > 0)}
            </div>
          </div>
        ))}
        
        {visiblePositions.length < Math.min(allPositions.length, 10) && (
          <Button
            onClick={showMorePositions}
            className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 font-bold transition-all duration-300 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Show More Positions ({allPositions.length - visiblePositions.length} remaining)
          </Button>
        )}
      </div>

      {/* Candle Intervals and Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-gray-400 text-sm">Candle Intervals</label>
          <ToggleGroup type="single" value={timeframe} onValueChange={setTimeframe} className="justify-start">
            {["1min", "3min", "5min", "15min", "1hr"].map((tf) => (
              <ToggleGroupItem
                key={tf}
                value={tf}
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-green-500/20 data-[state=on]:text-green-400"
              >
                {tf}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <label className="text-gray-400 text-sm">Position</label>
          <ToggleGroup type="single" value={position} onValueChange={setPosition} className="justify-start">
            <ToggleGroupItem
              value="Buy"
              className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-green-500/20 data-[state=on]:text-green-400"
            >
              Buy
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Sell"
              className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-red-500/20 data-[state=on]:text-red-400"
            >
              Sell
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Entry Conditions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
            If
          </h4>
          <ToggleGroup type="single" value={entryConnector} onValueChange={setEntryConnector}>
            <ToggleGroupItem 
              value="and" 
              className="backdrop-blur-sm bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 text-emerald-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500/60 data-[state=on]:to-teal-500/60 data-[state=on]:border-emerald-400/80 data-[state=on]:text-emerald-100 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:bg-gradient-to-r hover:from-emerald-500/40 hover:to-teal-500/40"
            >
              AND
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="or" 
              className="backdrop-blur-sm bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 text-amber-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-amber-500/60 data-[state=on]:to-orange-500/60 data-[state=on]:border-amber-400/80 data-[state=on]:text-amber-100 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:bg-gradient-to-r hover:from-amber-500/40 hover:to-orange-500/40"
            >
              OR
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-3">
          {entryConditions.map((condition, index) => (
            <div key={condition.id} className="flex items-center gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3">
              <Select value={condition.type} onValueChange={(value) => updateCondition(condition.id, 'type', value, 'entry')}>
                <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  {conditionTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={condition.operator} onValueChange={(value) => updateCondition(condition.id, 'operator', value, 'entry')}>
                <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  <SelectItem value=">" className="text-white hover:bg-white/10">{">"}</SelectItem>
                  <SelectItem value="<" className="text-white hover:bg-white/10">{"<"}</SelectItem>
                  <SelectItem value="=" className="text-white hover:bg-white/10">{"="}</SelectItem>
                  <SelectItem value=">=" className="text-white hover:bg-white/10">{">="}</SelectItem>
                  <SelectItem value="<=" className="text-white hover:bg-white/10">{"<="}</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Value"
                value={condition.value}
                onChange={(e) => updateCondition(condition.id, 'value', e.target.value, 'entry')}
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
              />
              
              {index < entryConditions.length - 1 && (
                <span className="text-gray-400 text-sm font-medium">
                  {entryConnector.toUpperCase()}
                </span>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(condition.id, 'entry')}
                className="hover:bg-red-500/20 text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => addCondition('entry')}
              disabled={entryConditions.length >= 8}
              className="backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-purple-500/50 hover:border-blue-400/80 hover:text-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      {/* Exit Conditions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Else
          </h4>
          <ToggleGroup type="single" value={exitConnector} onValueChange={setExitConnector}>
            <ToggleGroupItem 
              value="and" 
              className="backdrop-blur-sm bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/50 text-emerald-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500/60 data-[state=on]:to-teal-500/60 data-[state=on]:border-emerald-400/80 data-[state=on]:text-emerald-100 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:bg-gradient-to-r hover:from-emerald-500/40 hover:to-teal-500/40"
            >
              AND
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="or" 
              className="backdrop-blur-sm bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-400/50 text-amber-200 data-[state=on]:bg-gradient-to-r data-[state=on]:from-amber-500/60 data-[state=on]:to-orange-500/60 data-[state=on]:border-amber-400/80 data-[state=on]:text-amber-100 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:bg-gradient-to-r hover:from-amber-500/40 hover:to-orange-500/40"
            >
              OR
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-3">
          {exitConditions.map((condition, index) => (
            <div key={condition.id} className="flex items-center gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3">
              <Select value={condition.type} onValueChange={(value) => updateCondition(condition.id, 'type', value, 'exit')}>
                <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  {conditionTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={condition.operator} onValueChange={(value) => updateCondition(condition.id, 'operator', value, 'exit')}>
                <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  <SelectItem value=">" className="text-white hover:bg-white/10">{">"}</SelectItem>
                  <SelectItem value="<" className="text-white hover:bg-white/10">{"<"}</SelectItem>
                  <SelectItem value="=" className="text-white hover:bg-white/10">{"="}</SelectItem>
                  <SelectItem value=">=" className="text-white hover:bg-white/10">{">="}</SelectItem>
                  <SelectItem value="<=" className="text-white hover:bg-white/10">{"<="}</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder="Value"
                value={condition.value}
                onChange={(e) => updateCondition(condition.id, 'value', e.target.value, 'exit')}
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
              />
              
              {index < exitConditions.length - 1 && (
                <span className="text-gray-400 text-sm font-medium">
                  {exitConnector.toUpperCase()}
                </span>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(condition.id, 'exit')}
                className="hover:bg-red-500/20 text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => addCondition('exit')}
              disabled={exitConditions.length >= 8}
              className="backdrop-blur-sm bg-gradient-to-r from-pink-500/30 to-rose-500/30 border border-pink-400/50 text-pink-200 hover:bg-gradient-to-r hover:from-pink-500/50 hover:to-rose-500/50 hover:border-pink-400/80 hover:text-pink-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Actions to Execute
        </h4>
        
        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="flex items-center gap-3 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3">
              <Select value={action.type} onValueChange={(value) => updateAction(action.id, 'type', value)}>
                <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  {actionTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={action.symbol || ""} onValueChange={(value) => updateAction(action.id, 'symbol', value)}>
                <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue placeholder="Symbol" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  <SelectItem value="BTC" className="text-white hover:bg-white/10">BTC</SelectItem>
                  <SelectItem value="ETH" className="text-white hover:bg-white/10">ETH</SelectItem>
                  <SelectItem value="SOL" className="text-white hover:bg-white/10">SOL</SelectItem>
                  <SelectItem value="ADA" className="text-white hover:bg-white/10">ADA</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={action.orderType} onValueChange={(value) => updateAction(action.id, 'orderType', value)}>
                <SelectTrigger className="backdrop-blur-sm bg-white/10 border border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
                  <SelectItem value="Market" className="text-white hover:bg-white/10">Market</SelectItem>
                  <SelectItem value="Limit" className="text-white hover:bg-white/10">Limit</SelectItem>
                  <SelectItem value="Stop" className="text-white hover:bg-white/10">Stop</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAction(action.id)}
                className="hover:bg-red-500/20 text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <Button
            variant="ghost"
            onClick={addAction}
            disabled={actions.length >= 4}
            className="backdrop-blur-sm bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border border-indigo-400/50 text-indigo-200 hover:bg-gradient-to-r hover:from-indigo-500/50 hover:to-cyan-500/50 hover:border-indigo-400/80 hover:text-indigo-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Action
          </Button>
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
