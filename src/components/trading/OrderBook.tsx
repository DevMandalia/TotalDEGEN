
import { Card } from "@/components/ui/card";

interface OrderBookProps {
  symbol: string;
}

const OrderBook = ({ symbol }: OrderBookProps) => {
  const asks = [
    { price: 45789.12, size: 0.2345 },
    { price: 45756.78, size: 0.1892 },
    { price: 45723.45, size: 0.3456 },
    { price: 45690.11, size: 0.2789 },
    { price: 45656.88, size: 0.1234 },
  ];

  const bids = [
    { price: 45623.55, size: 0.2891 },
    { price: 45590.22, size: 0.3567 },
    { price: 45556.89, size: 0.1678 },
    { price: 45523.56, size: 0.2234 },
    { price: 45490.23, size: 0.3891 },
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <div className="p-4">
        <h4 className="text-sm font-medium mb-4">Order Book - {symbol}</h4>
        
        <div className="space-y-2 mb-4">
          <div className="text-xs text-gray-400 grid grid-cols-2 gap-4 px-2">
            <span>Price</span>
            <span className="text-right">Size</span>
          </div>
          
          {/* Asks */}
          {asks.map((ask, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 px-2 py-1 text-xs hover:bg-gray-800 rounded">
              <span className="text-red-400">{ask.price.toLocaleString()}</span>
              <span className="text-right text-gray-300">{ask.size}</span>
            </div>
          ))}
          
          {/* Spread */}
          <div className="border-t border-gray-700 pt-2 mt-2">
            <div className="text-xs text-center text-gray-400 py-1">
              Spread: $32.67
            </div>
          </div>
          
          {/* Bids */}
          {bids.map((bid, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 px-2 py-1 text-xs hover:bg-gray-800 rounded">
              <span className="text-green-400">{bid.price.toLocaleString()}</span>
              <span className="text-right text-gray-300">{bid.size}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default OrderBook;
