
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Ampersand } from "lucide-react";
import { Action, Condition, VisibleParameters } from "./conditional/types";
import WorkflowDiamond from "./conditional/WorkflowDiamond";
import ConditionRow from "./conditional/ConditionRow";
import ActionRow from "./conditional/ActionRow";

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

  const [visibleParameters, setVisibleParameters] = useState<VisibleParameters>({
    assetName: true,
    leverage: true,
    entryPrice: true,
    notionalSize: true,
    breakevenPrice: true,
    marginAmount: false,
    marginType: false,
    realTimePnL: true,
    pnLPercent: true,
    liquidationPrice: false,
    side: true,
    currentPrice: true,
    unrealizedPnL: true,
  });

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

  const removeAction = (id: string, actionType: 'true' | 'false') => {
    if (actionType === 'true') {
      setTrueActions(trueActions.filter(a => a.id !== id));
    } else {
      setFalseActions(falseActions.filter(a => a.id !== id));
    }
  };

  const updateCondition = (id: string, field: string, value: string) => {
    setEntryConditions(entryConditions.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const updateAction = (id: string, field: string, value: string, actionType: 'true' | 'false') => {
    if (actionType === 'true') {
      setTrueActions(trueActions.map(a => a.id === id ? { ...a, [field]: value } : a));
    } else {
      setFalseActions(falseActions.map(a => a.id === id ? { ...a, [field]: value } : a));
    }
  };

  const toggleParenthesis = (id: string, type: 'open' | 'close') => {
    setEntryConditions(entryConditions.map(c => 
      c.id === id 
        ? { ...c, [type === 'open' ? 'hasOpenParen' : 'hasCloseParen']: !c[type === 'open' ? 'hasOpenParen' : 'hasCloseParen'] }
        : c
    ));
  };

  const handleConnectorSelect = (id: string, connector: string) => {
    updateCondition(id, 'connector', connector);
    addCondition('');
  };

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
              {Object.entries(visibleParameters).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-white text-sm">{key}</span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setVisibleParameters({
                      ...visibleParameters,
                      [key]: e.target.checked
                    })}
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Workflow Layout */}
      <div className="flex flex-col items-center mb-8">
        <WorkflowDiamond />

        {/* Conditions */}
        <div className="w-full max-w-4xl space-y-4 mb-16">
          {entryConditions.map((condition, index) => (
            <ConditionRow
              key={condition.id}
              condition={condition}
              index={index}
              totalConditions={entryConditions.length}
              onUpdate={updateCondition}
              onRemove={removeCondition}
              onToggleParenthesis={toggleParenthesis}
              onConnectorSelect={handleConnectorSelect}
            />
          ))}
        </div>

        {/* Actions Layout */}
        <div className="w-full flex justify-between items-start max-w-6xl gap-8">
          {/* FALSE Actions - Left Side */}
          <div className="flex flex-col items-center flex-1">
            {/* Connecting Line from IF to Actions Rectangle */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-red-400 to-transparent mb-4"></div>
            
            {/* Actions to Execute Rectangle */}
            <div className="backdrop-blur-md bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/50 rounded-lg p-4 mb-6 w-full max-w-md">
              <h4 className="text-lg font-bold text-red-200 text-center">Actions to Execute</h4>
            </div>
            
            {/* FALSE Action Rows */}
            <div className="space-y-2 w-full max-w-md">
              {falseActions.map((action) => (
                <ActionRow
                  key={action.id}
                  action={action}
                  onUpdate={(id, field, value) => updateAction(id, field, value, 'false')}
                  onRemove={(id) => removeAction(id, 'false')}
                />
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
          <div className="flex flex-col items-center flex-1">
            {/* Connecting Line from IF to Actions Rectangle */}
            <div className="w-0.5 h-16 bg-gradient-to-b from-green-400 to-transparent mb-4"></div>
            
            {/* Actions to Execute Rectangle */}
            <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg p-4 mb-6 w-full max-w-md">
              <h4 className="text-lg font-bold text-green-200 text-center">Actions to Execute</h4>
            </div>
            
            {/* TRUE Action Rows */}
            <div className="space-y-2 w-full max-w-md">
              {trueActions.map((action) => (
                <ActionRow
                  key={action.id}
                  action={action}
                  onUpdate={(id, field, value) => updateAction(id, field, value, 'true')}
                  onRemove={(id) => removeAction(id, 'true')}
                />
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
