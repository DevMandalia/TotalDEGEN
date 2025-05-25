
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, X, Trash2, MoreHorizontal, Eye, EyeOff, Search } from "lucide-react";
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
  const [parameterSearchOpen, setParameterSearchOpen] = useState(false);
  const [assetSearchTerm, setAssetSearchTerm] = useState("");
  const [parameterSearchTerm, setParameterSearchTerm] = useState("");

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

  // Crypto assets from watchlist
  const cryptoAssets = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "DOT", name: "Polkadot" },
    { symbol: "MATIC", name: "Polygon" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "LINK", name: "Chainlink" }
  ];

  const technicalIndicators = [
    "Open", "Close", "High", "Low", "Volume",
    "RSI", "MACD", "ADX", "Bollinger Bands",
    "Moving Average", "Stochastic", "Williams %R",
    "Price", "Market Cap", "24h Volume"
  ];

  const orderTypes = ["Market", "Limit", "Stop", "Stop Limit", "OCO"];
  const orderSides = ["Buy", "Sell"];
  const timeInForceOptions = ["GTC", "IOC", "FOK", "Day"];

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

  const addCondition = (afterIndex: number, connector: string) => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      type: "RSI",
      operator: ">",
      value: "",
      connector
    };

    const newConditions = [...entryConditions];
    newConditions.splice(afterIndex + 1, 0, newCondition);
    setEntryConditions(newConditions);
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

  const addAction = (type: 'true' | 'false') => {
    const newAction: Action = {
      id: Date.now().toString(),
      orderType: "Market",
      side: "Buy",
      symbol: "BTC",
      quantity: "",
      timeInForce: "GTC"
    };

    if (type === 'true') {
      setTrueActions([...trueActions, newAction]);
    } else {
      setFalseActions([...falseActions, newAction]);
    }
  };

  const removeAction = (id: string, type: 'true' | 'false') => {
    if (type === 'true') {
      setTrueActions(trueActions.filter(a => a.id !== id));
    } else {
      setFalseActions(falseActions.filter(a => a.id !== id));
    }
  };

  const updateAction = (id: string, field: string, value: string, type: 'true' | 'false') => {
    const updateFn = (actions: Action[]) =>
      actions.map(a => a.id === id ? { ...a, [field]: value } : a);
    
    if (type === 'true') {
      setTrueActions(updateFn(trueActions));
    } else {
      setFalseActions(updateFn(falseActions));
    }
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

  const filteredCryptoAssets = cryptoAssets.filter(asset =>
    asset.symbol.toLowerCase().includes(assetSearchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(assetSearchTerm.toLowerCase())
  );

  const filteredParameters = technicalIndicators.filter(indicator =>
    indicator.toLowerCase().includes(parameterSearchTerm.toLowerCase())
  );

  const renderActionRow = (action: Action, type: 'true' | 'false') => (
    <div key={action.id} className="flex items-center gap-2 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-2">
      <Select value={action.orderType} onValueChange={(value) => updateAction(action.id, 'orderType', value, type)}>
        <SelectTrigger className="w-32 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
          {orderTypes.map((orderType) => (
            <SelectItem key={orderType} value={orderType} className="text-white hover:bg-white/10">
              {orderType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={action.side} onValueChange={(value) => updateAction(action.id, 'side', value, type)}>
        <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
          {orderSides.map((side) => (
            <SelectItem key={side} value={side} className="text-white hover:bg-white/10">
              {side}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={action.symbol} onValueChange={(value) => updateAction(action.id, 'symbol', value, type)}>
        <SelectTrigger className="w-24 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
          {cryptoAssets.map((asset) => (
            <SelectItem key={asset.symbol} value={asset.symbol} className="text-white hover:bg-white/10">
              {asset.symbol}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Input
        placeholder="Quantity"
        value={action.quantity}
        onChange={(e) => updateAction(action.id, 'quantity', e.target.value, type)}
        className="w-24 backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
      />
      
      {(action.orderType === 'Limit' || action.orderType === 'Stop Limit') && (
        <Input
          placeholder="Price"
          value={action.price || ""}
          onChange={(e) => updateAction(action.id, 'price', e.target.value, type)}
          className="w-24 backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
        />
      )}
      
      <Select value={action.timeInForce} onValueChange={(value) => updateAction(action.id, 'timeInForce', value, type)}>
        <SelectTrigger className="w-20 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-md bg-gray-900/90 border border-white/20">
          {timeInForceOptions.map((tif) => (
            <SelectItem key={tif} value={tif} className="text-white hover:bg-white/10">
              {tif}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeAction(action.id, type)}
        className="hover:bg-red-500/20 text-red-400"
      >
        <X className="w-4 h-4" />
      </Button>
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
              {Object.entries(visibleParams).map(([key, value]) => (
                <DropdownMenuItem key={key} className="flex items-center space-x-2 cursor-pointer">
                  <button
                    onClick={() => toggleParameter(key as keyof VisibleParameters)}
                    className="text-white hover:text-blue-400 flex items-center space-x-2"
                  >
                    {value ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    <span className="text-sm text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </button>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Position Parameters */}
      <div className="space-y-4 mb-6">
        {visiblePositions.map((pos, index) => (
          <div key={pos.id} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 flex-1">
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
          </div>
        ))}
        
        {visiblePositions.length < Math.min(allPositions.length, 10) && (
          <Button
            onClick={showMorePositions}
            className="backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-purple-500/50 hover:border-blue-400/80 hover:text-blue-100 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <Plus className="w-4 h-4 mr-2" />
            Show More Positions ({allPositions.length - visiblePositions.length} remaining)
          </Button>
        )}
      </div>

      {/* Workflow Diamond Layout */}
      <div className="flex flex-col items-center mb-8">
        {/* IF Diamond */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 rotate-45 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-xl font-bold text-white -rotate-45">IF</span>
          </div>
          
          {/* Connecting Lines - TRUE goes to the right, FALSE to the left */}
          <div className="absolute top-1/2 -right-20 w-16 h-0.5 bg-gradient-to-r from-green-400 to-transparent"></div>
          <div className="absolute top-1/2 -left-20 w-16 h-0.5 bg-gradient-to-l from-red-400 to-transparent"></div>
          
          {/* TRUE/FALSE Labels */}
          <div className="absolute top-1/2 -right-32 transform -translate-y-1/2 text-green-400 font-bold text-sm">TRUE</div>
          <div className="absolute top-1/2 -left-32 transform -translate-y-1/2 text-red-400 font-bold text-sm">FALSE</div>
        </div>

        {/* Conditions - Below the IF diamond */}
        <div className="mt-8 w-full max-w-4xl">
          <div className="space-y-4">
            {entryConditions.map((condition, index) => (
              <div key={condition.id} className="space-y-2">
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
                  
                  {/* Asset/Parameter Selector with Search Modal */}
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
                          {filteredCryptoAssets.map((asset) => (
                            <button
                              key={asset.symbol}
                              onClick={() => {
                                updateCondition(condition.id, 'type', asset.symbol);
                                setAssetSearchOpen(false);
                                setAssetSearchTerm("");
                              }}
                              className="w-full text-left p-2 rounded hover:bg-white/10 text-white"
                            >
                              <div className="font-medium">{asset.symbol}</div>
                              <div className="text-sm text-gray-400">{asset.name}</div>
                            </button>
                          ))}
                          {filteredParameters.map((param) => (
                            <button
                              key={param}
                              onClick={() => {
                                updateCondition(condition.id, 'type', param);
                                setAssetSearchOpen(false);
                                setAssetSearchTerm("");
                              }}
                              className="w-full text-left p-2 rounded hover:bg-white/10 text-white"
                            >
                              {param}
                            </button>
                          ))}
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
                      <SelectItem value="+" className="text-white hover:bg-white/10">{"+"}</SelectItem>
                      <SelectItem value="-" className="text-white hover:bg-white/10">{"-"}</SelectItem>
                      <SelectItem value="*" className="text-white hover:bg-white/10">{"*"}</SelectItem>
                      <SelectItem value="/" className="text-white hover:bg-white/10">{"/"}</SelectItem>
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

                {/* Connectors below each condition (except the last one) */}
                {index < entryConditions.length - 1 && (
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
                )}
              </div>
            ))}
          </div>
          
          {/* Add Condition Button */}
          {entryConditions.length > 0 && entryConditions[entryConditions.length - 1].connector && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => addCondition(entryConditions.length - 1, "")}
                disabled={entryConditions.length >= 8}
                className="backdrop-blur-sm bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-200 hover:bg-gradient-to-r hover:from-blue-500/50 hover:to-purple-500/50 hover:border-blue-400/80 hover:text-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
              >
                <Plus className="w-4 h-4 mr-2" />
                Condition {entryConditions.length + 1}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Action Sections - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* TRUE Actions */}
        <div>
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
            TRUE - Actions to Execute
          </h4>
          
          <div className="space-y-2">
            {trueActions.map((action) => renderActionRow(action, 'true'))}
            
            <Button
              onClick={() => addAction('true')}
              disabled={trueActions.length >= 4}
              className="backdrop-blur-sm bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-400/50 text-green-200 hover:bg-gradient-to-r hover:from-green-500/50 hover:to-emerald-500/50 hover:border-green-400/80 hover:text-green-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Action
            </Button>
          </div>
        </div>

        {/* FALSE Actions */}
        <div>
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-red-400 via-rose-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            FALSE - Actions to Execute
          </h4>
          
          <div className="space-y-2">
            {falseActions.map((action) => renderActionRow(action, 'false'))}
            
            <Button
              onClick={() => addAction('false')}
              disabled={falseActions.length >= 4}
              className="backdrop-blur-sm bg-gradient-to-r from-red-500/30 to-rose-500/30 border border-red-400/50 text-red-200 hover:bg-gradient-to-r hover:from-red-500/50 hover:to-rose-500/50 hover:border-red-400/80 hover:text-red-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Action
            </Button>
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
