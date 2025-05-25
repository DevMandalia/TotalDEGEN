
import { useState } from "react";
import { Action } from "../types";

export const useActions = () => {
  const [trueActions, setTrueActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Buy", symbol: "BTC", quantity: "1", timeInForce: "GTC" }
  ]);
  
  const [falseActions, setFalseActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Sell", symbol: "BTC", quantity: "1", timeInForce: "GTC" }
  ]);

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

  const updateAction = (id: string, field: string, value: string) => {
    const updateActionInList = (actions: Action[]) =>
      actions.map(action => 
        action.id === id ? { ...action, [field]: value } : action
      );

    setTrueActions(prev => updateActionInList(prev));
    setFalseActions(prev => updateActionInList(prev));
  };

  const removeAction = (id: string) => {
    setTrueActions(prev => prev.filter(action => action.id !== id));
    setFalseActions(prev => prev.filter(action => action.id !== id));
  };

  return {
    trueActions,
    falseActions,
    addAction,
    updateAction,
    removeAction
  };
};
