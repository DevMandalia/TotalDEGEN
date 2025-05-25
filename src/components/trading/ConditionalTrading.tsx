
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, X, Trash2 } from "lucide-react";

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

const ConditionalTrading = () => {
  const [timeframe, setTimeframe] = useState("1min");
  const [position, setPosition] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [instrument, setInstrument] = useState("");
  
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

  return (
    <Card className="backdrop-blur-md bg-white/5 border border-white/20 p-6 shadow-2xl">
      <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Conditional Trading Strategy
      </h3>

      {/* Strategy Setup */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-gray-400 text-sm">Search Instrument</label>
          <Input
            placeholder="Enter Here"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <label className="text-gray-400 text-sm">Quantity</label>
          <Input
            placeholder="Enter Here"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
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
          <h4 className="text-white font-medium">Entry When</h4>
          <ToggleGroup type="single" value={entryConnector} onValueChange={setEntryConnector}>
            <ToggleGroupItem value="and" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-blue-500/20">
              AND
            </ToggleGroupItem>
            <ToggleGroupItem value="or" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-blue-500/20">
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
              className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
          <h4 className="text-white font-medium">Exit When</h4>
          <ToggleGroup type="single" value={exitConnector} onValueChange={setExitConnector}>
            <ToggleGroupItem value="and" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-blue-500/20">
              AND
            </ToggleGroupItem>
            <ToggleGroupItem value="or" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white data-[state=on]:bg-blue-500/20">
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
              className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-4">Actions to Execute</h4>
        
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
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Action
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button className="bg-gradient-to-r from-orange-600/80 to-orange-700/80 hover:from-orange-700/80 hover:to-orange-800/80 backdrop-blur-md border border-white/20">
          Place Strategy
        </Button>
        <Button className="bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80 backdrop-blur-md border border-white/20">
          Save Strategy
        </Button>
        <Button className="bg-gradient-to-r from-green-600/80 to-green-700/80 hover:from-green-700/80 hover:to-green-800/80 backdrop-blur-md border border-white/20">
          Set Alerts
        </Button>
      </div>
    </Card>
  );
};

export default ConditionalTrading;
