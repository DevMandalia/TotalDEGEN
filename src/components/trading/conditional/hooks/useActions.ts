
import { useState } from "react";
import { Action } from "../types";

export const useActions = () => {
  const [trueActions, setTrueActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Buy", symbol: "BTC", quantity: "", timeInForce: "GTC" }
  ]);
  
  const [falseActions, setFalseActions] = useState<Action[]>([
    { id: "1", orderType: "Market", side: "Sell", symbol: "BTC", quantity: "", timeInForce: "GTC" }
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

  return {
    trueActions,
    falseActions,
    addAction
  };
};
