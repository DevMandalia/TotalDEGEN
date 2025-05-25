
import { useState } from "react";
import { Condition } from "../types";

export const useConditions = () => {
  const [entryConditions, setEntryConditions] = useState<Condition[]>([
    { id: "1", type: "Open", operator: ">", value: "" }
  ]);

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

  return {
    entryConditions,
    addCondition,
    removeCondition,
    updateCondition,
    toggleParenthesis
  };
};
