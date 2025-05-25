
export interface Condition {
  id: string;
  type: string;
  parameter?: string;
  operator: string;
  value: string;
  connector?: string;
  hasOpenParen?: boolean;
  hasCloseParen?: boolean;
}

export interface Action {
  id: string;
  orderType: string;
  side: string;
  symbol: string;
  quantity: string;
  price?: string;
  timeInForce: string;
}

export interface Position {
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

export interface VisibleParameters {
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
